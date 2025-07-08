<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <NuxtLink to="/" class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold text-sm">SA</span>
                            </div>
                            <span class="text-xl font-bold text-gray-900">Sistema Activación</span>
                        </NuxtLink>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8">
                        <NuxtLink 
                        to="/" 
                        class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        :class="{ 'text-primary-600': $route.path === '/' }"
                        >
                        Inicio
                    </NuxtLink>
                    <NuxtLink 
                    to="/diagnostico" 
                    class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    :class="{ 'text-primary-600': $route.path === '/diagnostico' }"
                    >
                    Diagnóstico
                </NuxtLink>
                <NuxtLink 
                to="/dashboard" 
                class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                :class="{ 'text-primary-600': $route.path === '/dashboard' }"
                >
                Dashboard
            </NuxtLink>
            <NuxtLink 
            to="/resultados" 
            class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-primary-600': $route.path === '/resultados' }"
            >
            Resultados
        </NuxtLink>
        <NuxtLink 
        to="/bonos" 
        class="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        :class="{ 'text-primary-600': $route.path === '/bonos' }"
        >
        Bonos
    </NuxtLink>
    </div>
    
    <!-- Mobile menu button -->
    <div class="md:hidden flex items-center">
        <button 
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="text-gray-700 hover:text-primary-600 p-2 rounded-md"
        >
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>
</div>
</div>

<!-- Mobile menu -->
<div v-if="mobileMenuOpen" class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <NuxtLink 
        to="/" 
        class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
        :class="{ 'text-primary-600 bg-primary-50': $route.path === '/' }"
        @click="mobileMenuOpen = false"
        >
        Inicio
    </NuxtLink>
    <NuxtLink 
    to="/diagnostico" 
    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
    :class="{ 'text-primary-600 bg-primary-50': $route.path === '/diagnostico' }"
    @click="mobileMenuOpen = false"
    >
    Diagnóstico
</NuxtLink>
<NuxtLink 
to="/dashboard" 
class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
:class="{ 'text-primary-600 bg-primary-50': $route.path === '/dashboard' }"
@click="mobileMenuOpen = false"
>
Dashboard
</NuxtLink>
<NuxtLink 
to="/resultados" 
class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
:class="{ 'text-primary-600 bg-primary-50': $route.path === '/resultados' }"
@click="mobileMenuOpen = false"
>
Resultados
</NuxtLink>
<NuxtLink 
to="/bonos" 
class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
:class="{ 'text-primary-600 bg-primary-50': $route.path === '/bonos' }"
@click="mobileMenuOpen = false"
>
Bonos
</NuxtLink>
</div>
</div>
</nav>

<!-- Main content -->
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <slot />
</main>

<!-- Footer -->
<footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-500 text-sm">
            © {{ currentYear }} Sistema de Activación Interna™. Todos los derechos reservados.
        </div>
    </div>
</footer>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const mobileMenuOpen = ref(false)
const currentYear = new Date().getFullYear()
</script> 