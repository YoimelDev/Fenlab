import { type VariantProps, cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-xl leading-5 tracking-wide font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow hover:bg-primary-hover',
                green: 'bg-electric-green text-white hover:bg-[#2C5B2C]',
                destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
          'border-2 border-electric-green text-electric-green bg-background shadow-sm hover:bg-accent',
                secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-[#004DF21A]',
                link: 'text-primary underline-offset-4 hover:underline',
                pagination: 'bg-[#004DF21A] hover:bg-[#004DF21A]',
            },
            size: {
                default: 'h-14 px-8 py-2',
                xs: 'h-8 rounded-md px-5 text-sm',
                sm: 'h-11 rounded-md px-5 text-sm',
                lg: 'h-10 rounded-md px-8',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
