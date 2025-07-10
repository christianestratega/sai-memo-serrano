import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId } = body

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'User ID is required'
      })
    }

    // Log the request for debugging
    console.log('🗑️ BACKEND DELETE DIAGNOSIS REQUEST:', { userId })

    // Delete the diagnosis
    const deletedDiagnosis = await prisma.diagnosis.deleteMany({
      where: {
        userId: userId
      }
    })

    // Log the response for debugging
    console.log('✅ BACKEND DELETE DIAGNOSIS SUCCESS:', { 
      deletedCount: deletedDiagnosis.count,
      userId 
    })

    return {
      success: true,
      deletedCount: deletedDiagnosis.count
    }

  } catch (error) {
    console.error('❌ BACKEND DELETE DIAGNOSIS ERROR:', error)
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      // Record not found
      return {
        success: true,
        deletedCount: 0
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Error deleting diagnosis'
    })
  }
}) 