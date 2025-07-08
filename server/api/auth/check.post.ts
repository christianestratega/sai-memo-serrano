import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email } = body

        if (!email) {
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
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        return {
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                diagnosis: user.diagnosis ? {
                    id: user.diagnosis.id,
                    userId: user.diagnosis.userId,
                    answers: JSON.parse(user.diagnosis.answers),
                    resultKey: user.diagnosis.resultKey,
                    createdAt: user.diagnosis.createdAt,
                    updatedAt: user.diagnosis.updatedAt
                } : null
            }
        }
    } catch (error) {
        console.error('Auth check error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 