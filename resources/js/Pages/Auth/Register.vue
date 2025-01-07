<script setup lang="ts">
import axios from 'axios'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

import { Input, Label, Button, Checkbox, useToast, Toaster } from '@/Components/ui'

const { toast } = useToast()

const form = useForm({
    name: '',
    company: '',
    email: '',
    telephone: '',
})

const submit = async (e: { preventDefault: () => void }) => {

    e.preventDefault()
    document.body.style.cursor = 'wait'
    form.processing = true

    try {
        await axios.post(route('contact.store'), form.data())

        toast({
            variant: 'info',
            title: '¡Gracias por contactarnos!',
        })
    } catch (error) {
        console.log(error)

        toast({
            variant: 'danger',
            title: '¡Ups! Algo salió mal.',
            description: 'Por favor, verifica los campos e intenta de nuevo.',
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

        <Head title="Register" />

        <header>
            <h1 class="text-[#21272A] text-4xl font-bold lg:text-[42px] leading-[46px]">
                ¡Ponte en contacto!
            </h1>

            <p class="mt-2 text-[#21272A] text-lg lg:text-[20px] leading-[23px]">
                Conoce como Fenlab puede ayudarte a gestionar tu
                producto financiero e inmobiliario
            </p>
        </header>

        <form @submit.prevent="submit">
            <div>
                <Label for="name">Nombre y apellidos</Label>

                <Input id="name" type="text" placeholder="Name" class="mt-2" v-model="form.name" required autofocus
                    autocomplete="name" />

                <InputError class="mt-2 ml-4" :message="form.errors.name" />
            </div>

            <!-- Company -->
            <div class="mt-4">
                <Label for="company">Empresa</Label>

                <Input id="company" type="text" placeholder="Empresa" class="mt-2" v-model="form.company" required
                    autofocus autocomplete="company" />

                <InputError class="mt-2 ml-4" :message="form.errors.company" />
            </div>

            <div class="mt-4">
                <Label for="email">Email</Label>

                <Input id="email" type="email" placeholder="Email" class="mt-2" v-model="form.email" required autofocus
                    autocomplete="username" />

                <InputError class="mt-2 ml-4" :message="form.errors.email" />
            </div>

            <!-- Telephone -->
            <div class="mt-4">
                <Label for="telephone">Teléfono</Label>

                <Input id="telephone" type="text" placeholder="Teléfono" class="mt-2" v-model="form.telephone" required
                    autofocus autocomplete="telephone" />

                <InputError class="mt-2 ml-4" :message="form.errors.telephone" />
            </div>

            <div class="flex items-center space-x-2 mt-4">
                <Checkbox id="terms" />
                <Label for="terms">
                    Acepto los
                    <Link href="#" class="text-[#001D6C] hover:text-gray-900 leading-5 rounded-md hover:underline">
                    términos y condiciones
                    </Link>
                </Label>
            </div>

            <div class="flex items-center justify-end gap-4 mt-4">
                <Button type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Contacta
                </Button>
            </div>
        </form>
    </GuestLayout>
</template>
