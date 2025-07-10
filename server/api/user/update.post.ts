export default defineEventHandler(async (event) => {
  // @ts-expect-error
  const { PrismaClient } = await import('@prisma/client')
  const prisma = new PrismaClient()

  try {
    const body = await readBody(event)
    const { userId, name, email, phone } = body

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required'
      })
    }

    // Log the request for debugging
    console.log('🔄 BACKEND UPDATE USER REQUEST:', { userId, name, email, phone })

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: userId }
        }
      })

      if (existingUser) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Email already in use by another user'
        })
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone })
      }
    })

    // Log the response for debugging
    console.log('✅ BACKEND UPDATE USER SUCCESS:', { 
      userId: updatedUser.id, 
      email: updatedUser.email,
      name: (updatedUser as any).name,
      phone: (updatedUser as any).phone
    })

    return {
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: (updatedUser as any).name,
          phone: (updatedUser as any).phone,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
      }
    }

  } catch (error) {
    console.error('❌ BACKEND UPDATE USER ERROR:', error)
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error updating user information'
    })
  }
}) 