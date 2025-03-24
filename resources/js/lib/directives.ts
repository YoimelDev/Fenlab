import { formatCurrency, formatPercentage } from './utils'

interface CurrencyDirectiveElement extends HTMLInputElement {
    __currencyDirectiveHandlers?: {
        input: (e: Event) => void;
        blur: () => void;
        focus: () => void;
    };
}

interface PercentageDirectiveElement extends HTMLInputElement {
    __percentageDirectiveHandlers?: {
        input: (e: Event) => void;
        blur: () => void;
        focus: () => void;
    };
}

const needsConversion = (value: string): boolean => {
    const num = parseInt(value, 10)
    return num < 10000 // Si es menor a 10000, asumimos que son céntimos
}

function handleInput(e: InputEvent, el: HTMLInputElement) {
    if (e.inputType === 'insertText' || e.inputType === 'deleteContentBackward') {
        const cursorPos = el.selectionStart || 0

        const currentValue = el.value.replace(/[^0-9.]/g, '')

        el.dataset.rawValue = currentValue
        el.value = currentValue

        el.setSelectionRange(cursorPos, cursorPos)
    }
}

function handleBlur(el: HTMLInputElement) {
    let value = el.dataset.rawValue || '0'
    if (!value.includes('.')) {
        if (needsConversion(value)) {
            value = (parseInt(value, 10) / 100).toString()
        }
    }
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
        el.value = formatCurrency(numericValue)
    }
}

function handleFocus(el: HTMLInputElement) {
    el.value = el.dataset.rawValue || ''
}

function handlePercentageInput(e: InputEvent, el: HTMLInputElement) {
    if (e.inputType === 'insertText' || e.inputType === 'deleteContentBackward') {
        const cursorPos = el.selectionStart || 0

        const currentValue = el.value.replace(/[^0-9.-]/g, '')

        el.dataset.rawValue = currentValue
        el.value = currentValue

        el.setSelectionRange(cursorPos, cursorPos)
    }
}

function handlePercentageBlur(el: HTMLInputElement) {
    let value = el.dataset.rawValue || '0'
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
        el.value = formatPercentage(numericValue)
    }
}

function handlePercentageFocus(el: HTMLInputElement) {
    el.value = el.dataset.rawValue || ''
}

export const percentageDirective = {
    beforeMount(el: HTMLInputElement) {
        const elExt = el as PercentageDirectiveElement
        // Inicializamos el valor y formateamos si es necesario
        el.dataset.rawValue = el.value
        if (el.value) {
            const numeric = parseFloat(el.value)
            el.value = formatPercentage(numeric)
        }
        // Registramos los manejadores para poder removerlos luego
        elExt.__percentageDirectiveHandlers = {
            input: (e: Event) => handlePercentageInput(e as InputEvent, el),
            blur: () => handlePercentageBlur(el),
            focus: () => handlePercentageFocus(el),
        }
        el.addEventListener('input', elExt.__percentageDirectiveHandlers.input)
        el.addEventListener('blur', elExt.__percentageDirectiveHandlers.blur)
        el.addEventListener('focus', elExt.__percentageDirectiveHandlers.focus)
    },
    updated(el: HTMLInputElement) {
        if (!el.matches(':focus')) {
            const rawValue = el.value.replace(/[^0-9.-]/g, '')
            el.dataset.rawValue = rawValue
            const value = rawValue || '0'
            el.value = formatPercentage(parseFloat(value))
        }
    },
    unmounted(el: HTMLInputElement) {
        const elExt = el as PercentageDirectiveElement
        // Removemos los manejadores para evitar fugas de memoria
        const handlers = elExt.__percentageDirectiveHandlers
        if (handlers) {
            el.removeEventListener('input', handlers.input)
            el.removeEventListener('blur', handlers.blur)
            el.removeEventListener('focus', handlers.focus)
            delete elExt.__percentageDirectiveHandlers
        }
    },
}

export const currencyDirective = {
    beforeMount(el: HTMLInputElement) {
        const elExt = el as CurrencyDirectiveElement
        // Inicializamos el valor y formateamos si es necesario
        el.dataset.rawValue = el.value
        if (el.value) {
            const numeric = parseFloat(el.value)
            el.value = formatCurrency(numeric)
        }
        // Registramos los manejadores para poder removelos luego
        elExt.__currencyDirectiveHandlers = {
            input: (e: Event) => handleInput(e as InputEvent, el),
            blur: () => handleBlur(el),
            focus: () => handleFocus(el),
        }
        el.addEventListener('input', elExt.__currencyDirectiveHandlers.input)
        el.addEventListener('blur', elExt.__currencyDirectiveHandlers.blur)
        el.addEventListener('focus', elExt.__currencyDirectiveHandlers.focus)
    },
    updated(el: HTMLInputElement) {
        if (!el.matches(':focus')) {
            const rawValue = el.value.replace(/[^0-9.]/g, '')
            el.dataset.rawValue = rawValue
            let value = rawValue || '0'
            if (!rawValue.includes('.')) {
                if (needsConversion(rawValue)) {
                    value = (parseInt(rawValue, 10) / 100).toString()
                }
            }
            el.value = formatCurrency(parseFloat(value))
        }
    },
    unmounted(el: HTMLInputElement) {
        const elExt = el as CurrencyDirectiveElement
        // Removemos los manejadores para evitar fugas de memoria
        const handlers = elExt.__currencyDirectiveHandlers
        if (handlers) {
            el.removeEventListener('input', handlers.input)
            el.removeEventListener('blur', handlers.blur)
            el.removeEventListener('focus', handlers.focus)
            delete elExt.__currencyDirectiveHandlers
        }
    },
}

/**
 * Directiva para formatear números como porcentajes en elementos HTML estáticos
 * Se puede usar en cualquier elemento HTML como span, div, etc.
 * Ejemplo: <span v-percentage-text="25">25</span> -> <span>25,00%</span>
 */
export const percentageTextDirective = {
    beforeMount(el: HTMLElement, binding: { value?: number | string }) {
        // Si hay un valor en el binding, usarlo
        if (binding.value !== undefined) {
            const numericValue = typeof binding.value === 'string'
                ? parseFloat(binding.value)
                : binding.value;

            if (!isNaN(numericValue)) {
                el.textContent = formatPercentage(numericValue);
            }
        }
        // Si no hay valor en binding pero hay texto en el elemento, formatearlo
        else if (el.textContent) {
            const numericValue = parseFloat(el.textContent);
            if (!isNaN(numericValue)) {
                el.textContent = formatPercentage(numericValue);
            }
        }
    },
    updated(el: HTMLElement, binding: { value?: number | string }) {
        // Actualiza el formato cuando el valor cambia
        if (binding.value !== undefined) {
            const numericValue = typeof binding.value === 'string'
                ? parseFloat(binding.value)
                : binding.value;

            if (!isNaN(numericValue)) {
                el.textContent = formatPercentage(numericValue);
            }
        }
    }
}
