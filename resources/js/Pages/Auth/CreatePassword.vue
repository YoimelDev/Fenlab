<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { Head, useForm } from '@inertiajs/vue3'

import { Input, Label, Button, useToast, Toaster } from '@/Components/ui'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-icons/vue'
import { getParamValue } from '@/lib/utils'

const { toast } = useToast()
const showPassword = ref(false)

const form = useForm({
    email: getParamValue('email'),
    password: '',
    token: getParamValue('token'),
})

const submit = async () => {
    document.body.style.cursor = 'wait'
    form.processing = true

    try {
        await axios.post(route('create-password'), form.data())        
        
        toast({
            variant: 'info',
            title: '¡Contraseña creada!',
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: error.response.data.message,
        })
    } finally {
        document.body.style.cursor = 'default'
        form.processing = false
        form.reset()
    }
}
</script>

<template>
    <Toaster />

    <GuestLayout>
        <Head title="Create Password" />

        <div class="mb-4 text-sm text-gray-600">
            Crear una contraseña para tu cuenta.
        </div>

        <form @submit.prevent="submit">
            <div>
                <Label for="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    class="mt-2"
                    v-model="form.email"
                    disabled
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
                        autocomplete="current-password"
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

            <div class="flex items-center justify-end mt-4">
                <Button
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Crear contraseña                    
                </Button>
            </div>
        </form>
    </GuestLayout>
</template>
