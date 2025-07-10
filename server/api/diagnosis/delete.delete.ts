export default defineEventHandler(async (event) => {
  // @ts-expect-error
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

    try {
        const body = await readBody(event)
        const { userId } = body

        if (!userId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'userId is required'
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

        // Delete diagnosis if it exists
        await prisma.diagnosis.deleteMany({
            where: { userId }
        })

        return {
            success: true,
            message: 'Diagnosis deleted successfully'
        }
    } catch (error) {
        console.error('Delete diagnosis error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 