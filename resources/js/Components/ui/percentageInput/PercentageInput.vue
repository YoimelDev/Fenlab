<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Input } from '@/Components/ui'
import { useFormatting } from '@/composables/useFormatting'

const props = defineProps({
  modelValue: { type: [Number, String], default: 0 },
  placeholder: { type: String, default: '0,00 %' },
  id: { type: String, default: '' },
  class: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const { formatPercentage } = useFormatting()
const inputValue = ref(props.modelValue)
const focused = ref(false)

// Función para formatear el valor según el estado del foco
const displayValue = computed(() => {
  if (focused.value) {
    // En foco muestra solo el valor numérico
    return inputValue.value
  }
  // Cuando no tiene foco, muestra el valor formateado como porcentaje
  return formatPercentage(inputValue.value)
})

// Actualizar el valor interno cuando cambia el modelValue externo
watch(() => props.modelValue, (newVal) => {
  if (newVal !== inputValue.value) {
    inputValue.value = newVal
  }
})

// Manejar cambios de entrada
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  let value = target.value.replace(/[^\d,.-]/g, '')

  // Normalizar separadores decimales
  value = value.replace(',', '.')

  // Asegurar que solo hay un separador decimal
  const parts = value.split('.')
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('')
  }

  const numValue = value ? parseFloat(value) : 0
  inputValue.value = numValue
  emit('update:modelValue', numValue)
}

const handleFocus = () => {
  focused.value = true
}

const handleBlur = () => {
  focused.value = false
}
</script>

<template>
  <div class="relative">
    <Input :id="id" type="text" :class="class" :placeholder="placeholder" :value="displayValue" @input="handleInput"
      @focus="handleFocus" @blur="handleBlur" />
    <span v-if="!focused" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
  </div>
</template>