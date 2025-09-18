<script setup lang="ts">
import { ref } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-icons/vue'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Checkbox } from '@/Components/ui/checkbox'
import { Button } from '@/Components/ui/button'

defineProps<{
    canResetPassword?: boolean
    status?: string
}>()

const showPassword = ref(false)

const form = useForm({
    email: '',
    password: '',
    remember: false,
})

const submit = () => {
    form.post(route('login'), {
        onFinish: () => {
            form.reset('password')
        },
    })
}
</script>

<template>
    <GuestLayout>

        <Head title="Inicia sesión" />

        <h1 class="text-[#21272A] text-4xl font-bold lg:text-[42px] leading-[46px]">
            Inicia sesión
        </h1>

        <form @submit.prevent="submit">
            <div>
                <Label for="email">Email</Label>

                <Input id="email" type="email" placeholder="Email" class="mt-2" v-model="form.email" required autofocus
                    autocomplete="username" />

                <InputError class="mt-2 ml-4" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <Label for="password">Contraseña</Label>

                <div class="relative w-full items-center">
                    <Input id="password" :type="showPassword ? 'text' : 'password'" placeholder="Contraseña"
                        class="mt-2" v-model="form.password" required autocomplete="current-password" />

                    <button type="button" class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                        <EyeOpenIcon v-if="showPassword" class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = false" />

                        <EyeClosedIcon v-else class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = true" />
                    </button>
                </div>

                <InputError class="mt-2 ml-4" :message="form.errors.password" />
            </div>

            <div class="flex justify-between mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ms-2 text-sm text-[#21272A]">Recuérdame</span>
                </label>

                <Link v-if="canResetPassword" :href="route('password.request')"
                    class="text-sm text-black hover:text-gray-900 leading-5 rounded-md hover:underline">
                Has olvidado tu contraseña?
                </Link>
            </div>

            <Button class="w-full mt-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Inicia sesión
            </Button>
        </form>

        <span class="h-[1px] w-full bg-[#DDE1E6]" />

        <p class="text-black text-2xl font-semibold text-center">
            ¿No tienes cuenta?
        </p>

        <Button as-child variant="outline">
            <Link :href="route('register')">
            Contáctanos
            </Link>
        </Button>
    </GuestLayout>
</template>
