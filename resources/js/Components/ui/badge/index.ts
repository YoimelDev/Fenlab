import { type VariantProps, cva } from "class-variance-authority";
import { ModelType, Status } from "@/types/fenlab";

export { default as Badge } from "./Badge.vue";

export const badgeVariants = cva(
    "inline-flex items-center rounded-[20px] border p-1 text-[10px] uppercase leading-[10px] font-black transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-[#E1EEE7] text-olive",
                primary: "border-transparent bg-[#ECE8D9] text-brown",
                secondary: "border-transparent bg-[#E0F1F1] text-ivy",
                progress:
                    "border-transparent bg-[#004DF21A] text-blue font-medium",
                pending:
                    "border-transparent bg-[#F291001A] text-[#D07D01] font-medium",
                success:
                    "border-transparent bg-[#50CD5E1A] text-electric-green font-medium",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

export type BadgeMode = ModelType | Status;

export const badgeMap: Record<BadgeMode, BadgeVariants["variant"]> = {
    REO: "default",
    NPL: "primary",
    NPL_BUY: "primary",
    "PL/SPL": "secondary",
    Pendiente: "pending",
    "En curso": "progress",
    Completado: "success",
    "Sin empezar": "pending",
    "Análisis en curso": "progress",
    "Análisis completo": "success",
    "Carga definitiva": "success",
};
