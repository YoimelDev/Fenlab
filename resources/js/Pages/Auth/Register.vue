<script setup lang="ts">
import { ref } from 'vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

import { EyeClosedIcon, EyeOpenIcon } from '@radix-icons/vue'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Button } from '@/Components/ui/button'

const showPassword = ref(false)

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('register'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation')
        },
    })
}
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <form @submit.prevent="submit">
            <div>
                <Label for="name">Name</Label>

                <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    class="mt-2"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError
                    class="mt-2 ml-4"
                    :message="form.errors.name"
                />
            </div>

            <div class="mt-4">
                <Label for="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    class="mt-2"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError
                    class="mt-2 ml-4"
                    :message="form.errors.email"
                />
            </div>

            <div class="mt-4">
                <Label for="password">Contraseña</Label>

                <div class="relative w-full items-center">
                    <Input
                        id="password"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Contraseña"
                        class="mt-2"
                        v-model="form.password"
                        required
                        autocomplete="new-password"
                    />

                    <button
                        type="button"
                        class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                    >
                        <EyeOpenIcon
                            v-if="showPassword"
                            class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = false"
                        />

                        <EyeClosedIcon
                            v-else
                            class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = true"
                        />
                    </button>
                </div>

                <span class="text-[#697077] text-xs leading-4">
                    Debe ser una combinación de mínimo 8 letras, números y símbolos.
                </span>

                <InputError
                    class="mt-2 ml-4"
                    :message="form.errors.password"
                />
            </div>

            <div class="mt-4">
                <Label for="password_confirmation">Confirmar Contraseña</Label>

                <div class="relative w-full items-center">
                    <Input
                        id="password_confirmation"
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Confirmar contraseña"
                        class="mt-2"
                        v-model="form.password_confirmation"
                        required
                        autocomplete="new-password"
                    />

                    <button
                        type="button"
                        class="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                    >
                        <EyeOpenIcon
                            v-if="showPassword"
                            class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = false"
                        />

                        <EyeClosedIcon
                            v-else
                            class="w-5 h-5 text-[#697077] cursor-pointer"
                            @click="showPassword = true"
                        />
                    </button>
                </div>

                <InputError
                    class="mt-2 ml-4"
                    :message="form.errors.password_confirmation"
                />
            </div>

            <div class="flex items-center justify-end gap-4 mt-4">
                <Link
                    :href="route('login')"
                    class="text-sm text-[#001D6C] hover:text-gray-900 leading-5 rounded-md hover:underline"
                >
                    Already registered?
                </Link>

                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Register
                </Button>
            </div>
        </form>
    </GuestLayout>
</template>
