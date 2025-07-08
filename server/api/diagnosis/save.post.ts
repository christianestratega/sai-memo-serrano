import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { userId, answers, resultKey } = body

        if (!userId || !answers || !resultKey) {
            throw createError({
                statusCode: 400,
                statusMessage: 'userId, answers, and resultKey are required'
            })
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        // Create or update diagnosis
        const diagnosis = await prisma.diagnosis.upsert({
            where: { userId },
            update: {
                answers: JSON.stringify(answers),
                resultKey,
                updatedAt: new Date()
            },
            create: {
                userId,
                answers: JSON.stringify(answers),
                resultKey
            }
        })

        return {
            data: {
                id: diagnosis.id,
                userId: diagnosis.userId,
                answers: JSON.parse(diagnosis.answers),
                resultKey: diagnosis.resultKey,
                createdAt: diagnosis.createdAt,
                updatedAt: diagnosis.updatedAt
            }
        }
    } catch (error) {
        console.error('Save diagnosis error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 