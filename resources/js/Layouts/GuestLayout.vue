<template>
    <div class="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
        <div class="hidden lg:block">
            <picture>
                <img
                    src="https://via.placeholder.com/1920x945"
                    alt="Placeholder"
                    class="w-full h-full object-cover"
                >
            </picture>
        </div>

        <div class="flex flex-col justify-center gap-12 max-w-[720px] w-full mx-auto px-4 lg:px-20 ">
            <slot />
        </div>
    </div>
</template>
