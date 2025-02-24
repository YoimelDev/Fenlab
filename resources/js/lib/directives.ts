import { formatCurrency } from './utils'

interface CurrencyDirectiveElement extends HTMLInputElement {
    __currencyDirectiveHandlers?: {
        input: (e: Event) => void;
        blur: () => void;
        focus: () => void;
    };
}

const needsConversion = (value: string): boolean => {
    const num = parseInt(value, 10)
    return num < 10000 // Si es menor a 10000, asumimos que son céntimos
}

// Separar handlers
function handleInput(e: InputEvent, el: HTMLInputElement) {
    if (e.inputType === 'insertText' || e.inputType === 'deleteContentBackward') {
        const currentValue = el.value.replace(/[^\d.]/g, '')
        el.dataset.rawValue = currentValue
        el.value = currentValue
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
        const rawValue = el.value.replace(/[^\d.]/g, '')
        el.dataset.rawValue = rawValue
        let value = rawValue || '0'
        if (!rawValue.includes('.')) {
            if (needsConversion(rawValue)) {
                value = (parseInt(rawValue, 10) / 100).toString()
            }
        }
        el.value = formatCurrency(parseFloat(value))
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
