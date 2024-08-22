import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
    'inline-flex items-center rounded-[20px] border p-1 text-[10px] leading-[10px] font-black transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
          'border-transparent bg-[#E1EEE7] text-olive',
                primary:
          'border-transparent bg-[#ECE8D9] text-brown',
                secondary:
          'border-transparent bg-[#E0F1F1] text-ivy',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
