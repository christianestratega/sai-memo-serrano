import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email } = body

        // Log the request for debugging
        console.log('🔍 AUTH CHECK REQUEST:', { email })

        if (!email) {
            console.log('❌ AUTH CHECK ERROR: Email is required')
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required'
            })
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                diagnosis: true
            }
        })

        if (!user) {
            console.log('❌ AUTH CHECK ERROR: User not found for email:', email)
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        const response = {
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: (user as any).name,
                    phone: (user as any).phone,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                diagnosis: user.diagnosis ? {
                    id: user.diagnosis.id,
                    userId: user.diagnosis.userId,
                    answers: user.diagnosis.answers ? JSON.parse(user.diagnosis.answers) : null,
                    resultKey: user.diagnosis.resultKey,
                    createdAt: user.diagnosis.createdAt,
                    updatedAt: user.diagnosis.updatedAt
                } : null
            }
        }

        // Log the response for debugging
        console.log('✅ AUTH CHECK SUCCESS:', { 
            userId: response.data.user.id, 
            email: response.data.user.email,
            name: response.data.user.name,
            hasDiagnosis: !!response.data.diagnosis 
        })

        return response
    } catch (error) {
        console.error('❌ AUTH CHECK ERROR:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 