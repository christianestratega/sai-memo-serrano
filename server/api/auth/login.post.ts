import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, name, phone } = body

        if (!email) {
            console.log('❌ LOGIN ERROR: Email is required')
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required'
            })
        }

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email },
            include: {
                diagnosis: true
            }
        })

        // Log the request for debugging
        console.log('🔐 LOGIN REQUEST:', { email, name, existingUser: !!user, existingName: (user as any)?.name })

        if (!user) {
            user = await (prisma.user.create as any)({
                data: { email, name: name || null, phone: phone || null },
                include: {
                    diagnosis: true
                }
            })
        } else if ((name && (user as any).name !== name) || (phone && (user as any).phone !== phone)) {
            // Update existing user with name or phone if provided and different
            user = await (prisma.user.update as any)({
                where: { email },
                data: { 
                    ...(name && { name }),
                    ...(phone && { phone })
                },
                include: {
                    diagnosis: true
                }
            })
        }

        let diagnosisData = null
        if (user && (user as any).diagnosis) {
            let parsedAnswers = null
            try {
                parsedAnswers = (user as any).diagnosis.answers ? JSON.parse((user as any).diagnosis.answers) : null
            } catch (parseErr) {
                console.error('Error parsing diagnosis answers:', parseErr)
            }
            diagnosisData = {
                id: (user as any).diagnosis.id,
                userId: (user as any).diagnosis.userId,
                answers: parsedAnswers,
                resultKey: (user as any).diagnosis.resultKey,
                createdAt: (user as any).diagnosis.createdAt,
                updatedAt: (user as any).diagnosis.updatedAt
            }
        }

        const response = {
            data: {
                user: {
                    id: (user as any).id,
                    email: (user as any).email,
                    name: (user as any).name,
                    phone: (user as any).phone,
                    createdAt: (user as any).createdAt,
                    updatedAt: (user as any).updatedAt
                },
                diagnosis: diagnosisData
            }
        }

        // Log the response for debugging
        console.log('✅ LOGIN SUCCESS:', { 
            userId: response.data.user.id, 
            email: response.data.user.email,
            name: response.data.user.name,
            hasDiagnosis: !!response.data.diagnosis 
        })

        return response
    } catch (error) {
        console.error('❌ LOGIN ERROR:', error)
        if (error instanceof Error) {
            throw createError({
                statusCode: 500,
                statusMessage: error.message
            })
        } else {
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal server error'
            })
        }
    }
}) 