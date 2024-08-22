import { type VariantProps, cva } from 'class-variance-authority'

export { default as Kpi } from './Kpi.vue'

export const kpiVariants = cva(
    'flex flex-col gap-4 p-4 rounded-sm max-w-[246px] w-full',
    {
        variants: {
            variant: {
                default: 'bg-blue',
                primary: 'bg-white [&_h2]:text-grey [&_p]:text-black [&_span]:text-grey',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export type KpiVariants = VariantProps<typeof kpiVariants>