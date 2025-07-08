<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">
                    Accede a tu Diagnóstico
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    Ingresa tu email para continuar
                </p>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div class="mt-1">
                            <input
                                id="email"
                                v-model="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="tu@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            :disabled="isLoading"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span v-if="isLoading">Accediendo...</span>
                            <span v-else>Continuar</span>
                        </button>
                    </div>
                </form>

                <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p class="text-sm text-red-600">{{ error }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Set page metadata
useHead({
    title: 'Login - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Accede a tu diagnóstico personalizado' }
    ]
})

const email = ref('')
const error = ref('')
const isLoading = ref(false)

const userStore = useUserStore()

const handleLogin = async () => {
    if (!email.value) {
        error.value = 'Por favor ingresa tu email'
        return
    }

    isLoading.value = true
    error.value = ''

    try {
        const result = await userStore.login(email.value)
        
        if (result.success) {
            // Redirect based on whether user has diagnosis
            if (userStore.hasDiagnosis) {
                await navigateTo('/resultados')
            } else {
                await navigateTo('/diagnostico')
            }
        } else {
            error.value = 'Error al acceder. Intenta de nuevo.'
        }
    } catch (err) {
        error.value = 'Error al acceder. Intenta de nuevo.'
        console.error('Login error:', err)
    } finally {
        isLoading.value = false
    }
}
</script> 