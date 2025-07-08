<template>
    <div class="max-w-2xl mx-auto">
        <div v-if="!showConfirmation" class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 relative">
            <!-- Progress Bar -->
            <div class="mb-8">
                <div class="flex justify-between mb-2">
                    <template v-for="n in totalSteps" :key="n">
                        <div class="flex flex-col items-center">
                            <div
                                :class="[
                                    'w-6 h-6 flex items-center justify-center rounded-full border-2 font-medium text-sm transition-all duration-300',
                                    currentStep === n
                                        ? 'bg-primary-600 text-white border-primary-600'
                                        : currentStep > n
                                            ? 'bg-green-500 text-white border-green-500'
                                            : 'bg-white text-gray-500 border-gray-300'
                                ]"
                            >
                                {{ n }}
                            </div>
                        </div>
                    </template>
                </div>
                <div class="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        class="h-3 bg-primary-600 transition-all duration-500"
                        :style="{ width: progressPercent + '%' }"
                    ></div>
                </div>
            </div>

            <!-- Step 1: Personal Information -->
            <div v-if="currentStep === 1" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <UserIcon class="w-5 h-5 text-primary-500" />
                            Nombre completo <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.fullName"
                            type="text"
                            placeholder="Ej: Juan Pérez"
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <EnvelopeIcon class="w-5 h-5 text-primary-500" />
                            Correo electrónico <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.email"
                            type="email"
                            placeholder="Ej: juan@email.com"
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <PhoneIcon class="w-5 h-5 text-primary-500" />
                            Teléfono celular <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.phone"
                            type="tel"
                            placeholder="Ej: +52 55 1234 5678"
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            required
                        />
                    </div>
                </div>
                <div class="flex justify-between items-center pt-4 relative">
                    <div></div>
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                        Paso {{ currentStep }} de {{ totalSteps }}
                    </div>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!isStep1Valid"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 2: Occupation -->
            <div v-if="currentStep === 2" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <UserIcon class="w-5 h-5 text-primary-500" />
                            ¿A qué te dedicas actualmente? <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.occupation"
                            type="text"
                            placeholder="Ej: Desarrollador de software, Consultor independiente, Estudiante..."
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            required
                        />
                    </div>
                </div>
                <div class="flex justify-between items-center pt-4 relative">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                        Paso {{ currentStep }} de {{ totalSteps }}
                    </div>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.occupation.trim()"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 3: Age -->
            <div v-if="currentStep === 3" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <CalendarIcon class="w-5 h-5 text-primary-500" />
                            ¿Cuál es tu edad? <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.age"
                            type="number"
                            min="1"
                            max="120"
                            placeholder="Ej: 28"
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            required
                        />
                    </div>
                </div>
                <div class="flex justify-between items-center pt-4 relative">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                        Paso {{ currentStep }} de {{ totalSteps }}
                    </div>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.age || parseInt(form.age) < 1"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 4: Family -->
            <div v-if="currentStep === 4" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <UsersIcon class="w-5 h-5 text-primary-500" />
                            ¿Tienes pareja, hijos o familia cercana que dependa de ti? <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="form.family"
                            rows="3"
                            placeholder="Ej: Vivo solo, pero tengo responsabilidades con mis padres. / Estoy casado con 2 hijos pequeños. / Comparto casa con mi pareja..."
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base resize-none bg-white hover:border-gray-400"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="flex justify-between items-center pt-4 relative">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                        Paso {{ currentStep }} de {{ totalSteps }}
                    </div>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.family.trim()"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 5: Responsibility -->
            <div v-if="currentStep === 5" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <ShieldCheckIcon class="w-5 h-5 text-primary-500" />
                            ¿Cómo describirías tu nivel de responsabilidad actual? <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="form.responsibility"
                            rows="3"
                            placeholder="Ej: Alto - manejo un equipo de trabajo. / Medio - soy responsable de mis proyectos personales. / Bajo - principalmente me ocupo de mí mismo..."
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base resize-none bg-white hover:border-gray-400"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="flex justify-between items-center pt-4 relative">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <div class="absolute left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
                        Paso {{ currentStep }} de {{ totalSteps }}
                    </div>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.responsibility.trim()"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 6: Main Statement -->
            <div v-if="currentStep === 6" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <LightBulbIcon class="w-5 h-5 text-primary-500" />
                            ¿Con cuál de estas frases te identificas más últimamente? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                v-for="option in mainStatementOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-5 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-32"
                                :class="form.mainStatement === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.mainStatement === option.value"
                                tabindex="0"
                                @click="selectOption('mainStatement', option.value)"
                                @keydown.enter.prevent="selectOption('mainStatement', option.value)"
                                @keydown.space.prevent="selectOption('mainStatement', option.value)"
                            >
                                <component :is="option.icon" class="w-8 h-8 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium leading-tight">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 7: Main Emotion -->
            <div v-if="currentStep === 7" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <HeartIcon class="w-5 h-5 text-primary-500" />
                            ¿Cuál de estas emociones aparece más en tus semanas? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button
                                v-for="(label, val) in emotions"
                                :key="val"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-24"
                                :class="form.mainEmotion === val ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.mainEmotion === val"
                                tabindex="0"
                                @click="selectOption('mainEmotion', val)"
                                @keydown.enter.prevent="selectOption('mainEmotion', val)"
                                @keydown.space.prevent="selectOption('mainEmotion', val)"
                            >
                                <component :is="emotionIcons[val]" class="w-6 h-6 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium">{{ label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 8: Energy -->
            <div v-if="currentStep === 8" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <BoltIcon class="w-5 h-5 text-primary-500" />
                            ¿Cómo describirías tus niveles de energía y enfoque al iniciar el día? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                v-for="option in energyOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-5 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-28"
                                :class="form.energy === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.energy === option.value"
                                tabindex="0"
                                @click="selectOption('energy', option.value)"
                                @keydown.enter.prevent="selectOption('energy', option.value)"
                                @keydown.space.prevent="selectOption('energy', option.value)"
                            >
                                <component :is="option.icon" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 9: Procrastination -->
            <div v-if="currentStep === 9" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <ClockIcon class="w-5 h-5 text-primary-500" />
                            Cuando procrastinas, ¿qué es lo que más te detiene? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                v-for="(label, val) in procrastination"
                                :key="val"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-32"
                                :class="form.procrastination === val ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.procrastination === val"
                                tabindex="0"
                                @click="selectOption('procrastination', val)"
                                @keydown.enter.prevent="selectOption('procrastination', val)"
                                @keydown.space.prevent="selectOption('procrastination', val)"
                            >
                                <component :is="procrastinationIcons[val]" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium leading-tight">{{ label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 10: Reaction -->
            <div v-if="currentStep === 10" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <ArrowPathIcon class="w-5 h-5 text-primary-500" />
                            ¿Cómo reaccionas cuando algo no sale como esperabas? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                v-for="(label, val) in reaction"
                                :key="val"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-32"
                                :class="form.reaction === val ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.reaction === val"
                                tabindex="0"
                                @click="selectOption('reaction', val)"
                                @keydown.enter.prevent="selectOption('reaction', val)"
                                @keydown.space.prevent="selectOption('reaction', val)"
                            >
                                <component :is="reactionIcons[val]" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium leading-tight">{{ label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 11: Misalignment -->
            <div v-if="currentStep === 11" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <ExclamationTriangleIcon class="w-5 h-5 text-primary-500" />
                            ¿En qué parte de tu vida sientes más desalineación? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-2 gap-4">
                            <button
                                v-for="option in misalignmentOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-28"
                                :class="form.misalignment === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.misalignment === option.value"
                                tabindex="0"
                                @click="selectOption('misalignment', option.value)"
                                @keydown.enter.prevent="selectOption('misalignment', option.value)"
                                @keydown.space.prevent="selectOption('misalignment', option.value)"
                            >
                                <component :is="option.icon" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 12: Rituals -->
            <div v-if="currentStep === 12" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <SparklesIcon class="w-5 h-5 text-primary-500" />
                            ¿Tienes rituales o hábitos que te ayuden a volver al enfoque? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                v-for="option in ritualsOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-32"
                                :class="form.rituals === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.rituals === option.value"
                                tabindex="0"
                                @click="selectOption('rituals', option.value)"
                                @keydown.enter.prevent="selectOption('rituals', option.value)"
                                @keydown.space.prevent="selectOption('rituals', option.value)"
                            >
                                <component :is="option.icon" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium leading-tight">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 13: Autopilot -->
            <div v-if="currentStep === 13" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <Cog6ToothIcon class="w-5 h-5 text-primary-500" />
                            ¿Con qué frecuencia sientes que estás actuando "en piloto automático"? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button
                                v-for="option in autopilotOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-4 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-28"
                                :class="form.autopilot === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.autopilot === option.value"
                                tabindex="0"
                                @click="selectOption('autopilot', option.value)"
                                @keydown.enter.prevent="selectOption('autopilot', option.value)"
                                @keydown.space.prevent="selectOption('autopilot', option.value)"
                            >
                                <component :is="option.icon" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 14: Unlock -->
            <div v-if="currentStep === 14" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <KeyIcon class="w-5 h-5 text-primary-500" />
                            ¿Qué te gustaría desbloquear primero? <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                v-for="option in unlockOptions"
                                :key="option.value"
                                type="button"
                                class="flex flex-col items-center gap-3 w-full py-6 px-5 rounded-xl shadow-sm border transition-all duration-200 text-center focus:outline-none cursor-pointer h-32"
                                :class="form.unlock === option.value ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-200 shadow-md' : 'border-gray-200 bg-white hover:border-primary-400 hover:bg-primary-50 focus:ring-2 focus:ring-primary-200 hover:shadow-md'"
                                :aria-pressed="form.unlock === option.value"
                                tabindex="0"
                                @click="selectOption('unlock', option.value)"
                                @keydown.enter.prevent="selectOption('unlock', option.value)"
                                @keydown.space.prevent="selectOption('unlock', option.value)"
                            >
                                <component :is="option.icon" class="w-7 h-7 text-primary-500 flex-shrink-0" />
                                <span class="text-sm font-medium leading-tight">{{ option.label }}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                </div>
            </div>

            <!-- Step 15: 30 Day Result -->
            <div v-if="currentStep === 15" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <TrophyIcon class="w-5 h-5 text-primary-500" />
                            Si pudieras reconfigurar cómo operas por dentro, ¿qué resultado concreto te gustaría ver en 30 días? <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="form.result30"
                            rows="4"
                            placeholder="Ej: Quiero despertar cada mañana con claridad sobre mis prioridades del día y la energía para ejecutarlas. Me gustaría sentir que avanzo consistentemente en mis proyectos más importantes sin sentirme abrumado..."
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base resize-none bg-white hover:border-gray-400"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.result30.trim()"
                        @click="nextStep"
                    >
                        Siguiente
                    </button>
                </div>
            </div>

            <!-- Step 16: 6 Month Consequences -->
            <div v-if="currentStep === 16" class="space-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                            <ExclamationCircleIcon class="w-5 h-5 text-primary-500" />
                            ¿Qué pasaría si nada cambia en los próximos 6 meses? <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="form.noChange6"
                            rows="4"
                            placeholder="Ej: Seguiría sintiéndome estancado, frustrado por no avanzar en mis metas. Mi salud mental podría deteriorarse, y las oportunidades importantes podrían pasar de largo. Mi relación conmigo mismo empeoraría..."
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base resize-none bg-white hover:border-gray-400"
                            required
                        ></textarea>
                    </div>
                </div>
                <div class="flex justify-between pt-4">
                    <button type="button" class="btn-secondary" @click="prevStep">Anterior</button>
                    <button
                        type="button"
                        class="btn-primary"
                        :disabled="!form.noChange6.trim()"
                        @click="submitForm"
                    >
                        Enviar diagnóstico
                    </button>
                </div>
            </div>
            

        </div>

        <!-- Confirmation -->
        <div v-else class="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center space-y-6">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">¡Diagnóstico enviado!</h2>
            <p class="text-gray-600">Gracias por compartir tu información. Pronto recibirás una evaluación personalizada basada en la filosofía de Memo Serrano.</p>
            <button class="btn-primary mt-4" @click="resetForm">Nuevo diagnóstico</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { UserIcon, CalendarIcon, UsersIcon, ShieldCheckIcon, LightBulbIcon, HeartIcon, BoltIcon, ClockIcon, ArrowPathIcon, ExclamationTriangleIcon, SparklesIcon, Cog6ToothIcon, KeyIcon, TrophyIcon, ExclamationCircleIcon, ChevronDownIcon, CheckCircleIcon, XCircleIcon, EyeIcon, LinkIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/vue/24/outline'

// Use available icons for option cards
import { FireIcon, ListBulletIcon, FaceFrownIcon, SunIcon, AdjustmentsHorizontalIcon, BriefcaseIcon, GlobeAltIcon } from '@heroicons/vue/24/solid'

const currentStep = ref(1)
const totalSteps = 16
const showConfirmation = ref(false)

const form = ref({
    // Step 1: Personal Information
    fullName: '',
    email: '',
    phone: '',
    // Step 2-5: Contexto personal
    occupation: '',
    age: '',
    family: '',
    responsibility: '',
    // Step 6-8: Estado interno actual
    mainStatement: '',
    mainEmotion: '',
    energy: '',
    // Step 9-11: Patrón dominante
    procrastination: '',
    reaction: '',
    misalignment: '',
    // Step 12-13: Ritmo y rutina
    rituals: '',
    autopilot: '',
    // Step 14-16: Intención y deseo de cambio
    unlock: '',
    result30: '',
    noChange6: ''
})

// Validation for Step 1
const isStep1Valid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
    
    return form.value.fullName.trim() !== '' && 
           emailRegex.test(form.value.email) && 
           phoneRegex.test(form.value.phone)
})

// Option card data for select questions (use only available icons)
const mainStatementOptions = [
    { value: 'no_hago', label: 'Sé lo que tengo que hacer, pero no lo hago.', icon: CheckCircleIcon },
    { value: 'apagando_fuegos', label: 'Me la paso apagando fuegos y nunca avanzo en lo importante.', icon: FireIcon },
    { value: 'mil_cosas', label: 'Hago mil cosas, pero no siento avance real.', icon: ListBulletIcon },
    { value: 'desmotivado', label: 'Estoy desmotivado, pero no sé por qué.', icon: FaceFrownIcon }
]
const energyOptions = [
    { value: 'altos', label: 'Altos y claros', icon: SunIcon },
    { value: 'fluctuantes', label: 'Fluctuantes', icon: AdjustmentsHorizontalIcon },
    { value: 'bajos', label: 'Bajos y pesados', icon: HeartIcon },
    { value: 'nose', label: 'No sé ni cómo me siento', icon: EyeIcon }
]
const misalignmentOptions = [
    { value: 'trabajo', label: 'Trabajo', icon: BriefcaseIcon },
    { value: 'salud', label: 'Salud', icon: HeartIcon },
    { value: 'relaciones', label: 'Relaciones', icon: UsersIcon },
    { value: 'proposito', label: 'Propósito', icon: GlobeAltIcon }
]
const ritualsOptions = [
    { value: 'consistente', label: 'Sí, y los uso consistentemente', icon: CheckCircleIcon },
    { value: 'abandono', label: 'Sí, pero los abandono cuando más los necesito', icon: XCircleIcon },
    { value: 'no', label: 'No, improviso todo el tiempo', icon: Cog6ToothIcon }
]
const autopilotOptions = [
    { value: 'nunca', label: 'Casi nunca', icon: BoltIcon },
    { value: 'algunas', label: 'Algunas veces', icon: AdjustmentsHorizontalIcon },
    { value: 'siempre', label: 'Casi siempre', icon: LinkIcon }
]
const unlockOptions = [
    { value: 'claridad', label: 'Claridad mental y enfoque', icon: SunIcon },
    { value: 'confianza', label: 'Confianza y ejecución constante', icon: CheckCircleIcon },
    { value: 'energia', label: 'Energía y motivación sostenible', icon: BoltIcon },
    { value: 'conexion', label: 'Conexión con lo que hago', icon: LinkIcon }
]

// Options for radio/selects with icons
const emotions = {
    frustracion: 'Frustración',
    ansiedad: 'Ansiedad',
    cansancio: 'Cansancio mental',
    apatia: 'Apatía',
    culpa: 'Culpa'
}
const emotionIcons = {
    frustracion: ExclamationTriangleIcon,
    ansiedad: EyeIcon,
    cansancio: FaceFrownIcon,
    apatia: XCircleIcon,
    culpa: ShieldCheckIcon
}

const procrastination = {
    perfeccion: 'Miedo a no hacerlo perfecto',
    sin_claridad: 'Sensación de que no tengo claridad',
    sin_proposito: 'Me siento desconectado del propósito',
    abrumado: 'Me abruma pensar en todo lo que tengo que hacer'
}
const procrastinationIcons = {
    perfeccion: CheckCircleIcon,
    sin_claridad: EyeIcon,
    sin_proposito: GlobeAltIcon,
    abrumado: ExclamationTriangleIcon
}

const reaction = {
    castigo: 'Me encierro y me castigo internamente',
    distraccion: 'Me distraigo con cosas sin importancia',
    exijo: 'Me exijo el doble para compensar',
    indiferente: 'Actúo como si no me importara, pero me pesa'
}
const reactionIcons = {
    castigo: ShieldCheckIcon,
    distraccion: EyeIcon,
    exijo: BoltIcon,
    indiferente: XCircleIcon
}

// Progress bar percent
const progressPercent = computed(() => ((currentStep.value - 1) / (totalSteps - 1)) * 100)

// Function to select an option and auto-advance
function selectOption(field: keyof typeof form.value, value: string) {
    form.value[field] = value
    // Auto-advance to next step after a short delay for visual feedback
    setTimeout(() => {
        nextStep()
    }, 300)
}

function nextStep() {
    if (currentStep.value < totalSteps) {
        currentStep.value++
    }
}

function prevStep() {
    if (currentStep.value > 1) {
        currentStep.value--
    }
}

// Define emits
const emit = defineEmits<{
    'diagnosis-completed': [{ answers: any, resultKey: string }]
}>()

const userStore = useUserStore()

// Autofill email from session/global state on mount
onMounted(() => {
    // Prefer Pinia store, fallback to localStorage
    const sessionEmail = userStore.userEmail || localStorage.getItem('userEmail') || ''
    if (sessionEmail && !form.value.email) {
        form.value.email = sessionEmail
    }
})

// Watch for changes to the email field and sync to session/global state
watch(() => form.value.email, (newEmail) => {
    if (newEmail && newEmail !== userStore.userEmail) {
        userStore.login(newEmail) // This will update Pinia and localStorage
    }
})

function submitForm() {
    // Ensure session/global state is up to date
    if (form.value.email && form.value.email !== userStore.userEmail) {
        userStore.login(form.value.email)
    }
    // Calculate result key based on form answers
    const resultKey = calculateResultKey()
    
    // Emit the diagnosis completion event
    emit('diagnosis-completed', {
        answers: { ...form.value },
        resultKey
    })
    
    showConfirmation.value = true
}

function calculateResultKey(): string {
    // Simple logic to determine the result key based on form answers
    // This is a basic implementation - you can make it more sophisticated
    
    const answers = form.value
    
    // Check for procrastination patterns
    if (answers.mainStatement === 'no_hago' || answers.procrastination === 'perfeccion') {
        return 'procrastinador'
    }
    
    // Check for perfectionism
    if (answers.procrastination === 'perfeccion' || answers.reaction === 'exijo') {
        return 'perfeccionista'
    }
    
    // Check for hyperactivity
    if (answers.mainStatement === 'mil_cosas' || answers.autopilot === 'siempre') {
        return 'hiperactivo'
    }
    
    // Check for scattered focus
    if (answers.mainStatement === 'apagando_fuegos' || answers.energy === 'fluctuantes') {
        return 'disperso'
    }
    
    // Check for fear of judgment
    if (answers.mainEmotion === 'ansiedad' || answers.reaction === 'castigo') {
        return 'miedo-que-diran'
    }
    
    // Check for lack of purpose
    if (answers.mainStatement === 'desmotivado' || answers.procrastination === 'sin_proposito') {
        return 'sin-proposito'
    }
    
    // Check for over-intellectualization
    if (answers.procrastination === 'sin_claridad' || answers.unlock === 'claridad') {
        return 'hiperintelectualizador'
    }
    
    // Default fallback
    return 'procrastinador'
}

function resetForm() {
    form.value = {
        fullName: '',
        email: '',
        phone: '',
        occupation: '',
        age: '',
        family: '',
        responsibility: '',
        mainStatement: '',
        mainEmotion: '',
        energy: '',
        procrastination: '',
        reaction: '',
        misalignment: '',
        rituals: '',
        autopilot: '',
        unlock: '',
        result30: '',
        noChange6: ''
    }
    currentStep.value = 1
    showConfirmation.value = false
}
</script>
