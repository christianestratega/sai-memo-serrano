<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Removed warning banner -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <!-- Loading State -->
            <div v-if="userStore.isLoading" class="text-center py-12">
                <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cargando...
                </div>
            </div>

            <!-- No Diagnosis Warning -->
            <div v-else-if="!userStore.hasDiagnosis" class="bg-amber-50 border border-amber-200 rounded-xl p-8">
                <div class="text-center space-y-4">
                    <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                        <ExclamationTriangleIcon class="w-8 h-8 text-amber-600" />
                    </div>
                    <h2 class="text-2xl font-bold text-amber-800">No tienes un diagnóstico</h2>
                    <p class="text-amber-700">
                        Necesitas completar el diagnóstico para ver tus resultados personalizados.
                    </p>
                    <NuxtLink 
                        to="/diagnostico" 
                        class="btn-primary bg-amber-600 hover:bg-amber-700 border-amber-600 hover:border-amber-700 inline-flex items-center gap-2"
                    >
                        Ir al Diagnóstico
                    </NuxtLink>
                </div>
            </div>

            <!-- Demo Profile Selection (only show if no real diagnosis) -->
            <div v-else-if="showDemoSelector" class="bg-white rounded-xl p-6 shadow-sm border">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Seleccionar Perfil de Ejemplo</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button 
                        v-for="profile in resultProfiles" 
                        :key="profile.key"
                        @click="selectedProfile = profile.key"
                        :class="[
                            'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                            selectedProfile === profile.key 
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        ]"
                    >
                        {{ profile.title }}
                    </button>
                </div>
            </div>

            <!-- Main Content -->
            <div v-if="currentProfile" class="space-y-8">
                <!-- Header -->
                <div class="text-center space-y-4">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
                        {{ currentProfile.title }}
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        {{ currentProfile.description }}
                    </p>
                </div>

                <!-- Symptoms -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <ExclamationTriangleIcon class="w-6 h-6 text-red-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Síntomas</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <ul class="space-y-3">
                            <li v-for="symptom in currentProfile.symptoms" :key="symptom" 
                                class="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                                <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span class="text-gray-700">{{ symptom }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Action Plan -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CheckCircleIcon class="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Plan de Acción</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <ul class="space-y-3">
                            <li v-for="action in currentProfile.actionPlan" :key="action" 
                                class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span class="text-gray-700">{{ action }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Daily Action Plan -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ClockIcon class="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Plan de Acción Diario</h2>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-8">
                        <!-- Morning Routine -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <SunIcon class="w-5 h-5 text-yellow-500" />
                                Rutina de Mañana
                            </h3>
                            <div class="space-y-3">
                                <div v-for="(routine, index) in currentProfile.morningRoutine" :key="index"
                                     class="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                                    <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    <span class="text-gray-700">{{ routine }}</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Evening Routine -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <MoonIcon class="w-5 h-5 text-purple-500" />
                                Rutina de Noche
                            </h3>
                            <div class="space-y-3">
                                <div v-for="(routine, index) in currentProfile.nightRoutine" :key="index"
                                     class="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                    <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span class="text-gray-700">{{ routine }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recommended Books -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <BookOpenIcon class="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Libros y Recursos Recomendados</h2>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-6">
                        <div v-for="book in currentProfile.books" :key="book"
                             class="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                            <h3 class="font-semibold text-gray-900 mb-2">{{ book }}</h3>
                            <p class="text-sm text-gray-600 mb-3"></p>
                            <p class="text-sm text-gray-700"></p>
                        </div>
                    </div>
                </div>

                <!-- Famous Entrepreneurs -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <TrophyIcon class="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Emprendedores que Superaron este Patrón</h2>
                    </div>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div v-for="entrepreneur in currentProfile.famousExamples" :key="entrepreneur"
                             class="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                            <div class="flex items-start gap-4">
                                <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <UserIcon class="w-8 h-8 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900 mb-2">{{ entrepreneur }}</h3>
                                    <p class="text-sm text-gray-600 mb-3"></p>
                                    <div class="text-sm text-yellow-700 font-medium italic">
                                        ""
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Personalized Affirmation -->
                <div class="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-8">
                    <div class="text-center space-y-6">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <SparklesIcon class="w-8 h-8 text-blue-600" />
                        </div>
                        
                        <div class="space-y-4">
                            <h2 class="text-2xl font-bold text-gray-900">Tu Afirmación Personalizada</h2>
                            <div class="bg-white rounded-xl p-8 border border-blue-100 shadow-sm">
                                <p class="text-lg text-gray-700 leading-relaxed italic">
                                    {{ currentProfile.affirmation }}
                                </p>
                            </div>
                            <p class="text-sm text-gray-500">
                                Repite esta afirmación cada mañana durante 30 días
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Micro Actions -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircleIcon class="w-6 h-6 text-green-600" />
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Microacciones Recomendadas</h2>
                    </div>
                    
                    <div class="space-y-3">
                        <ul class="space-y-3">
                            <li v-for="action in currentProfile.microActions" :key="action" 
                                class="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                                <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span class="text-gray-700">{{ action }}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 shadow-lg">
                    <div class="text-center space-y-6">
                        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <PhoneIcon class="w-10 h-10 text-blue-600" />
                        </div>
                        
                        <div class="space-y-3">
                            <h2 class="text-2xl font-bold text-gray-900">¿Quieres acelerar tu transformación?</h2>
                            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
                                Agenda tu Llamada de Desbloqueo 1-1 con el equipo de Memo y recibe ayuda personalizada 
                                para implementar tu plan en tu vida diaria.
                            </p>
                        </div>
                        
                        <a 
                            href="#" 
                            @click.prevent="openBookingPopup" 
                            class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2 text-lg px-8 py-4"
                        >
                            <CalendarIcon class="w-6 h-6" />
                            Agendar Llamada 1-1
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    ExclamationTriangleIcon, 
    UserIcon, 
    CalendarIcon, 
    ClockIcon,
    CheckCircleIcon,
    SunIcon,
    MoonIcon,
    BookOpenIcon,
    TrophyIcon,
    SparklesIcon,
    PhoneIcon
} from '@heroicons/vue/24/outline'
import { useBookingModal } from '~/composables/useBookingModal'
const { open: openBookingPopup } = useBookingModal()

// Set page metadata
useHead({
    title: 'Resultados - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Resultados personalizados del diagnóstico de activación' }
    ]
})

// @ts-expect-error Nuxt macro
definePageMeta({
  middleware: ['auth']
})

// Get query parameter for profile selection (for demo mode)
const route = useRoute()
const userStore = useUserStore()

// Show demo selector only if no real diagnosis and query param is present
const showDemoSelector = computed(() => {
    return !userStore.hasDiagnosis && route.query.perfil
})

// Use real diagnosis result or fall back to demo
const selectedProfile = computed(() => {
    if (userStore.hasDiagnosis && userStore.diagnosis) {
        return userStore.diagnosis.resultKey
    }
    return route.query.perfil as string || 'procrastinador'
})

// Result profiles data
const resultProfiles = [
    {
        key: "procrastinador",
        title: "Procrastinador Crónico",
        description:
            "Sabes lo que hay que hacer, pero lo postergas. No es flojera, es miedo disfrazado de ocupación o perfeccionismo. Tu potencial está secuestrado por excusas lógicas y distracciones diarias.",
        symptoms: [
            "Dejas lo más importante para después",
            "Haces tareas pequeñas solo para sentirte productivo",
            "Te sientes frustrado al final del día por no avanzar en lo esencial",
        ],
        actionPlan: [
            "Bloquea 1 hora al día para tu tarea clave antes de cualquier otra cosa.",
            "Usa la técnica Pomodoro (25/5 min).",
            "Cada noche, revisa tu avance y planea solo 1-3 acciones clave para el día siguiente.",
        ],
        morningRoutine: [
            "Visualiza tu MIT (tarea más importante).",
            "Meditación breve para calmar la mente.",
            "Empieza con la tarea clave antes de revisar mensajes/redes.",
        ],
        nightRoutine: [
            "Anota 1 cosa que avanzaste hoy.",
            "Prepara el material necesario para la tarea de mañana.",
            "Lee 10 min un libro de enfoque/productividad.",
        ],
        books: [
            "Hábitos Atómicos – James Clear",
            "Esencialismo – Greg McKeown",
        ],
        famousExamples: [
            "Tim Ferriss (admite que procrastinó escribir su primer libro y lo venció con bloques diarios)",
        ],
        affirmation:
            "Hoy acciono primero lo que más impacta mi vida, aunque me incomode. Mi avance es prioridad, no mis excusas.",
        microActions: [
            "Escribe y ejecuta tu MIT antes de cualquier otra cosa.",
            "Pon el celular en modo avión la primera hora del día.",
        ],
    },
    {
        key: "perfeccionista",
        title: "Perfeccionista Paralizante",
        description:
            "Tu estándar es tan alto que nada es suficiente para ser lanzado. La búsqueda de perfección se volvió tu mayor bloqueo y pospones por miedo a no cumplir tus expectativas (o las de otros).",
        symptoms: [
            "Tardas semanas/meses ajustando detalles sin avanzar",
            "Sientes ansiedad al lanzar algo que no está 'perfecto'",
            "Prefieres no mostrar tu trabajo antes que recibir crítica",
        ],
        actionPlan: [
            "Lanza versiones beta y recoge feedback real.",
            "Limita revisiones a máximo dos iteraciones por tarea.",
            "Cada semana, publica algo 'imperfecto' y mide el aprendizaje.",
        ],
        morningRoutine: [
            "Escribe tu 'no negociable' del día (aunque no sea perfecto).",
            "Haz un pequeño release temprano (post, video, mail).",
        ],
        nightRoutine: [
            "Anota 1 cosa que lanzaste hoy aunque no estuviera perfecta.",
            "Revisa retroalimentación recibida, no tu autocrítica.",
        ],
        books: [
            "El arte de empezar – Guy Kawasaki",
            "The Lean Startup – Eric Ries",
        ],
        famousExamples: [
            "Reid Hoffman (LinkedIn): 'Si no te avergüenza tu primer producto, lanzaste muy tarde.'",
        ],
        affirmation:
            "Hoy me permito avanzar sin perfección. Cada paso imperfecto me acerca a la excelencia real.",
        microActions: [
            "Publica o envía algo aunque no esté pulido.",
            "Pide feedback directo y objetivo, no aprobación.",
        ],
    },
    {
        key: "hiperactivo",
        title: "Hiperactivo Sin Rumbo",
        description:
            "Estás siempre ocupado pero tus resultados no cambian. Haces muchas tareas, saltas entre proyectos, pero pocas mueven realmente tu negocio. Eres esclavo del movimiento, no del avance.",
        symptoms: [
            "Listas de tareas infinitas, pero pocos proyectos completados",
            "Sensación de cansancio constante sin resultados tangibles",
            "Reuniones y mensajes te roban foco cada día",
        ],
        actionPlan: [
            "Elige 3 prioridades semanales, nada más.",
            "Agenda bloques de Deep Work (sin interrupciones).",
            "Rechaza tareas o reuniones que no impactan tus metas.",
        ],
        morningRoutine: [
            "Define tus 3 prioridades del día.",
            "Bloquea 2 horas para avanzar lo esencial.",
        ],
        nightRoutine: [
            "Haz un cierre breve: ¿Avancé en prioridades o solo apagué fuegos?",
            "Ajusta tu lista de tareas para simplificar mañana.",
        ],
        books: [
            "Esencialismo – Greg McKeown",
            "La Única Cosa – Gary Keller",
        ],
        famousExamples: [
            "Steve Jobs (famoso por eliminar cientos de proyectos para enfocar Apple)",
        ],
        affirmation:
            "Mi poder está en el foco. Hoy elijo avanzar en lo que más impacto tiene, lo demás puede esperar.",
        microActions: [
            "Elimina 1 tarea de tu lista que no aporte a tus objetivos.",
            "Programa 1 hora de trabajo sin notificaciones.",
        ],
    },
    {
        key: "disperso",
        title: "Enfocado Disperso",
        description:
            "Te motivas fácil con nuevas ideas pero te cuesta cerrar ciclos. Empiezas proyectos, cursos, partnerships, pero saltas a la siguiente novedad sin terminar lo anterior.",
        symptoms: [
            "Varias iniciativas abiertas y ninguna terminada",
            "Sientes culpa por no concretar lo que inicias",
            "Notion/trello lleno de pendientes y brainstorms sin ejecución",
        ],
        actionPlan: [
            "Cierra un proyecto antes de iniciar otro.",
            "Haz seguimiento semanal de 'cosas por terminar'.",
            "Celebra cada ciclo cerrado, por pequeño que sea.",
        ],
        morningRoutine: [
            "Elige UNA sola prioridad para terminar hoy.",
            "Anota todas las distracciones y guárdalas para después.",
        ],
        nightRoutine: [
            "Tacha de tu lista al menos 1 pendiente finalizado.",
            "Anota el avance real (no solo ideas).",
        ],
        books: [
            "Deep Work – Cal Newport",
            "Termina lo que empiezas – Jon Acuff",
        ],
        famousExamples: [
            "Richard Branson (aprendió a cerrar y vender empresas para avanzar)",
        ],
        affirmation:
            "Hoy cierro ciclos. Mi crecimiento real está en lo que termino, no en lo que solo empiezo.",
        microActions: [
            "Tacha un proyecto pequeño pendiente hoy.",
            "Agenda bloque para cierre, no para nuevas ideas.",
        ],
    },
    {
        key: "miedo-que-diran",
        title: "Miedo al Qué Dirán",
        description:
            "Sabes lo que quieres hacer, pero el miedo a la crítica, rechazo o al juicio te frena. Piensas demasiado en la opinión externa y postergas decisiones clave.",
        symptoms: [
            "Dudas antes de lanzar algo nuevo por miedo al 'qué dirán'",
            "Necesitas aprobación de otros antes de actuar",
            "Sientes ansiedad al exponerte o vender",
        ],
        actionPlan: [
            "Lanza 'en pequeño' para tomar confianza.",
            "Habla abiertamente con un mentor sobre tu miedo.",
            "Escribe y repite tu visión personal cada día.",
        ],
        morningRoutine: [
            "Lee tu visión/purpose en voz alta.",
            "Prepara un micro-acción de visibilidad (ej: un post, una llamada).",
        ],
        nightRoutine: [
            "Reflexiona: ¿En qué dejé que el miedo al juicio me frenara hoy?",
            "Anota una pequeña victoria en la que fuiste visible.",
        ],
        books: [
            "El sutil arte de que te importe un caraj* – Mark Manson",
            "La semana laboral de 4 horas – Tim Ferriss",
        ],
        famousExamples: [
            "Sara Blakely (Spanx): lanzó sin experiencia y fue criticada, pero siguió adelante",
        ],
        affirmation:
            "Hoy actúo desde mi visión, no desde el miedo. Mi autenticidad es mi mejor estrategia.",
        microActions: [
            "Publica algo hoy sin pedir opinión.",
            "Llama a un prospecto o cliente sin filtro.",
        ],
    },
    {
        key: "sin-proposito",
        title: "Desconectado de su Propósito",
        description:
            "Tienes éxito externo pero te sientes vacío o desmotivado. Has perdido claridad sobre el 'para qué' de tus acciones y tus metas no te emocionan.",
        symptoms: [
            "Logras objetivos pero no te generan satisfacción",
            "No encuentras dirección clara en tu negocio",
            "Cambias de metas sin claridad interna",
        ],
        actionPlan: [
            "Haz journaling sobre tus verdaderos deseos y valores.",
            "Agenda una sesión semanal de reflexión sin distracciones.",
            "Reconecta con proyectos o personas que te inspiran.",
        ],
        morningRoutine: [
            "Escribe una intención para el día basada en tu propósito.",
            "Revisa tus valores antes de decidir prioridades.",
        ],
        nightRoutine: [
            "¿Qué hice hoy que se alineó con mi propósito?",
            "Planifica una acción que te acerque a esa conexión mañana.",
        ],
        books: [
            "Encuentra tu porqué – Simon Sinek",
            "El hombre en busca de sentido – Viktor Frankl",
        ],
        famousExamples: [
            "Tony Hsieh (Zappos), cambió de rumbo hasta encontrar sentido en su trabajo",
        ],
        affirmation:
            "Hoy actúo alineado con mi propósito. El éxito real es avanzar en lo que me hace sentir vivo.",
        microActions: [
            "Haz una lista de 3 cosas que te motivan genuinamente.",
            "Agenda una llamada con alguien que te inspire.",
        ],
    },
    {
        key: "hiperintelectualizador",
        title: "Hiperintelectualizador",
        description:
            "Analizas todo tanto que nunca tomas acción. Tomas cursos, estudias, consumes contenido, pero postergas la acción por esperar el \"momento perfecto\" o el conocimiento total.",
        symptoms: [
            "Consumes demasiada información y aplicas poco",
            "Cambias de estrategia antes de ejecutarla",
            "Sientes que nunca estás listo para lanzar",
        ],
        actionPlan: [
            "Limita tu consumo de información a 1 hora diaria.",
            "Aplica una cosa aprendida antes de buscar más teorías.",
            "Haz un 'reto de acción' semanal.",
        ],
        morningRoutine: [
            "Elige un aprendizaje clave y agenda una acción para aplicarlo.",
            "No consumas nuevo contenido hasta terminar la acción planeada.",
        ],
        nightRoutine: [
            "Anota lo que ejecutaste y lo que solo estudiaste.",
            "Reconoce tus avances en la práctica, no en teoría.",
        ],
        books: [
            "Hazlo. No lo pienses tanto – Shunmyo Masuno",
            "Show Your Work! – Austin Kleon",
        ],
        famousExamples: [
            "Naval Ravikant (filósofo/empresario): recomienda aprender lo justo y actuar mucho más",
        ],
        affirmation:
            "Hoy ejecuto más de lo que pienso. La claridad viene de la acción, no de la teoría.",
        microActions: [
            "Aplica hoy un solo concepto aprendido.",
            "Prohíbete consumir contenido nuevo hasta terminar una acción real.",
        ],
    },
];

// Get current profile based on selection
const currentProfile = computed(() => {
    return resultProfiles.find(profile => profile.key === selectedProfile.value)
})

// Watch for route changes to update selected profile (only for demo mode)
watch(() => route.query.perfil, (newPerfil) => {
    // Only update if we're in demo mode (no real diagnosis)
    if (!userStore.hasDiagnosis && newPerfil && resultProfiles.some(p => p.key === newPerfil)) {
        // The computed selectedProfile will automatically update
    }
})
</script>

<style scoped>
.btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors duration-200;
}
</style>