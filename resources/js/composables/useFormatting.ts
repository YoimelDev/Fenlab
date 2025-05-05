// composables/useFormatting.ts
import { ref, computed } from "vue";

export function useFormatting() {
    // Formateador para moneda (EUR)
    const formatCurrency = (value: number | string): string => {
        const numValue =
            typeof value === "string"
                ? parseFloat(value.replace(",", "."))
                : value;

        if (isNaN(numValue)) return "0,00 €";

        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numValue);
    };

    // Formateador para porcentajes
    const formatPercentage = (value: number | string): string => {
        const numValue =
            typeof value === "string"
                ? parseFloat(value.replace(",", "."))
                : value;

        if (isNaN(numValue)) return "0,00 %";

        return new Intl.NumberFormat("es-ES", {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numValue / 100);
    };

    // Manejador para input de moneda
    const useCurrencyInput = (initialValue: number | string = 0) => {
        const inputValue = ref(initialValue);

        // Para mostrar en el input
        const displayValue = computed(() => {
            if (inputValue.value === null || inputValue.value === "") return "";
            return formatCurrency(inputValue.value);
        });

        // Para almacenar el valor numérico
        const numericValue = computed(() => {
            if (typeof inputValue.value === "number") return inputValue.value;

            const cleaned = String(inputValue.value)
                .replace(/[^\d,.-]/g, "") // Eliminar todo excepto números, comas, puntos
                .replace(",", "."); // Convertir comas a puntos

            return parseFloat(cleaned) || 0;
        });

        // Manejador de eventos para inputs
        const handleInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            let value = target.value.replace(/[^\d,.]/g, "");

            // Normalizar separadores decimales
            value = value.replace(",", ".");

            // Asegurar que solo hay un separador decimal
            const parts = value.split(".");
            if (parts.length > 2) {
                value = parts[0] + "." + parts.slice(1).join("");
            }

            inputValue.value = value ? parseFloat(value) : 0;
        };

        return { inputValue, displayValue, numericValue, handleInput };
    };

    // Manejador para input de porcentaje
    const usePercentageInput = (initialValue: number | string = 0) => {
        const inputValue = ref(initialValue);

        // Para mostrar en el input
        const displayValue = computed(() => {
            if (inputValue.value === null || inputValue.value === "") return "";
            return formatPercentage(inputValue.value);
        });

        // Para almacenar el valor numérico
        const numericValue = computed(() => {
            if (typeof inputValue.value === "number") return inputValue.value;

            const cleaned = String(inputValue.value)
                .replace(/[^\d,.-]/g, "") // Eliminar todo excepto números, comas, puntos
                .replace(",", "."); // Convertir comas a puntos

            return parseFloat(cleaned) || 0;
        });

        // Manejador de eventos para inputs
        const handleInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            let value = target.value.replace(/[^\d,.]/g, "");

            // Normalizar separadores decimales
            value = value.replace(",", ".");

            // Asegurar que solo hay un separador decimal
            const parts = value.split(".");
            if (parts.length > 2) {
                value = parts[0] + "." + parts.slice(1).join("");
            }

            inputValue.value = value ? parseFloat(value) : 0;
        };

        return { inputValue, displayValue, numericValue, handleInput };
    };

    return {
        formatCurrency,
        formatPercentage,
        useCurrencyInput,
        usePercentageInput,
    };
}
