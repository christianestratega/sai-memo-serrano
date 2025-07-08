<template>
    <button
    :type="type"
    :disabled="disabled"
    :class="[
    'btn-primary',
    size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3',
    fullWidth ? 'w-full' : '',
    disabled ? 'disabled:bg-gray-400 disabled:cursor-not-allowed' : '',
    className
    ]"
    @click="$emit('click', $event)"
    >
    <slot />
</button>
</template>

<script setup lang="ts">
interface Props {
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    className?: string
}

withDefaults(defineProps<Props>(), {
    type: 'button',
    disabled: false,
    size: 'md',
    fullWidth: false,
    className: ''
})

defineEmits<{
    click: [event: MouseEvent]
}>()
</script> 