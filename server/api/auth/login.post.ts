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

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { email },
            include: {
                diagnosis: true
            }
        })

        if (!user) {
            user = await prisma.user.create({
                data: { email },
                include: {
                    diagnosis: true
                }
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
        console.error('Login error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 