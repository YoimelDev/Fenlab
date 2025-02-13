<script setup lang="ts">
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { Head, useForm } from '@inertiajs/vue3'

import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Button } from '@/Components/ui/button'
import BackButton from '@/Components/common/BackButton.vue'

defineProps<{
    status?: string
}>()

const form = useForm({
    email: '',
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <GuestLayout>
        <Head title="¿Olvidaste tu contraseña?" />

        <BackButton />

        <div class="mb-4 text-sm text-gray-600">
            ¿Olvidaste tu contraseña? No hay problema. Solo indícanos tu correo electrónico y te enviaremos un enlace para restablecer la contraseña que te permitirá elegir una nueva.
        </div>

        <div
            v-if="status"
            class="mb-4 font-medium text-sm text-green-600"
        >
            {{ status }}
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
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError
                    class="mt-2 ml-4"
                    :message="form.errors.email"
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <Button
                    size="sm"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Enviar enlace para restablecer la contraseña
                </Button>
            </div>
        </form>
    </GuestLayout>
</template>
