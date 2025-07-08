<template>
    <div class="space-y-12">
        <!-- Hero Section -->
        <div class="text-center space-y-8">
            <div class="space-y-4">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
                    Bienvenido al <span class="text-primary-600">Sistema</span>
                    <span class="block md:hidden text-primary-600">
                        de Activación Interna™
                    </span>
                    <span class="hidden md:inline">
                        <br>
                        <span class="text-primary-600">de Activación Interna™</span>
                    </span>
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Descubre tu potencial máximo y transforma tu vida con nuestro sistema de diagnóstico personalizado y plan de acción adaptado a tus necesidades específicas.
                </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <NuxtLink 
                    to="/diagnostico" 
                    class="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                    Empezar Diagnóstico
                    <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </NuxtLink>
                <NuxtLink 
                    to="/dashboard" 
                    class="btn-secondary text-lg px-8 py-4"
                >
                    Ver Dashboard
                </NuxtLink>
            </div>
        </div>

        <!-- Features Section -->
        <div class="grid md:grid-cols-3 gap-8 mt-16">
            <div class="card text-center space-y-4">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">Diagnóstico Preciso</h3>
                <p class="text-gray-600">Evaluación personalizada basada en tu situación actual y objetivos específicos.</p>
            </div>

            <div class="card text-center space-y-4">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">Plan Personalizado</h3>
                <p class="text-gray-600">Estrategias y acciones específicas diseñadas para maximizar tu potencial.</p>
            </div>

            <div class="card text-center space-y-4">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900">Seguimiento Continuo</h3>
                <p class="text-gray-600">Monitoreo de tu progreso y ajustes del plan según tus resultados.</p>
            </div>
        </div>
    </div>
</template>