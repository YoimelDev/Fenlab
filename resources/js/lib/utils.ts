import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Updater } from "@tanstack/vue-table";
import type { Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function valueUpdater<T extends Updater<unknown>>(
    updaterOrValue: T,
    ref: Ref,
) {
    ref.value =
        typeof updaterOrValue === "function"
            ? updaterOrValue(ref.value)
            : updaterOrValue;
}

export function getParamValue(param: string): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || "";
}

/**
 * Formats a number as a percentage string with 2 decimal places using Spanish locale.
 * @param value - The number to convert to percentage (1 for 1,00%)
 * @returns A localized percentage string with 2 decimal places
 * @example
 * formatPercentage(-92.31) // returns "-92,31%"
 * formatPercentage(1) // returns "1,00%"
 * formatPercentage(-1) // returns "-1,00%"
 */
export function formatPercentage(value: number | string): string {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const multiplier = 0.01;
    // Solo agrupar si el valor original es de 5 cifras o más
    const grouping = Math.abs(numValue) >= 10000;
    return (numValue * multiplier).toLocaleString("es-ES", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: grouping,
    });
}

/**
 * Formats a number as a currency string in EUR using Spanish locale
 * @param value - The number to format as currency
 * @returns A string representation of the number formatted as EUR currency with exactly 2 decimal places
 * @example
 * formatCurrency(1234.5) // returns "1.234,50 €"
 * formatCurrency(1000) // returns "1.000,00 €"
 */
export function formatCurrency(value: number | string): string {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const grouping = Math.abs(numValue) >= 1000;
    return numValue.toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: grouping,
    });
}

/**
 * Formats a number or string representation of a number to a localized string with fixed decimal places.
 *
 * @param value - The number or string to format
 * @returns A formatted string representation of the number with exactly 2 decimal places using Spanish locale
 *
 * @example
 * formatNumber(1234.5) // returns "1.234,50"
 * formatNumber("1234.5") // returns "1.234,50"
 */
export function formatNumber(value: number | string): string {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    const grouping = Math.abs(numValue) >= 10000;
    return numValue.toLocaleString("es-ES", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: grouping,
    });
}
