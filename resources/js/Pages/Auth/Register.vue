<script setup lang="ts">
import axios from 'axios'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import InputError from '@/Components/InputError.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref } from 'vue'

import { Input, Label, Button, Checkbox, useToast, Toaster } from '@/Components/ui'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/Components/ui/dialog'
import BackButton from '@/Components/common/BackButton.vue'

const { toast } = useToast()

// Estado para controlar el modal de términos
const showTermsModal = ref(false)

const form = useForm({
    name: '',
    company: '',
    email: '',
    telephone: '',
})

// Función para prevenir la entrada de caracteres no válidos
const preventInvalidChars = (event: KeyboardEvent) => {
    const key = event.key
    const target = event.target as HTMLInputElement
    const currentValue = target.value

    // Permitir teclas de control (backspace, delete, arrows, etc.)
    if (key.length > 1) {
        return
    }

    // Permitir números
    if (/[0-9]/.test(key)) {
        return
    }

    // Permitir + solo al principio y si no hay ya un +
    if (key === '+' && currentValue.length === 0 && !currentValue.includes('+')) {
        return
    }

    // Prevenir cualquier otro carácter
    event.preventDefault()
}

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
        <BackButton />

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

                <Input id="name" type="text" placeholder="Nombre y apellidos" class="mt-2" v-model="form.name" required
                    autofocus autocomplete="name" />

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

                <Input id="telephone" type="text" placeholder="Teléfono (ej: +34123456789 o 123456789)" class="mt-2"
                    v-model="form.telephone" @keydown="preventInvalidChars" required autofocus
                    autocomplete="telephone" />

                <InputError class="mt-2 ml-4" :message="form.errors.telephone" />
            </div>

            <div class="flex items-center space-x-2 mt-4">
                <Checkbox id="terms" />
                <Label for="terms">
                    Acepto los
                    <Dialog v-model:open="showTermsModal">
                        <DialogTrigger as-child>
                            <button type="button"
                                class="text-[#001D6C] hover:text-gray-900 leading-5 rounded-md hover:underline cursor-pointer inline">
                                términos y condiciones
                            </button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden">
                            <DialogHeader>
                                <DialogTitle class="text-xl font-bold">Términos y Condiciones</DialogTitle>
                            </DialogHeader>
                            <div class="overflow-y-auto max-h-[70vh] pr-2">
                                <div class="space-y-6 text-sm leading-relaxed">
                                    <div>
                                        <h2 class="text-center font-bold text-lg mb-4 text-gray-800">
                                            POLÍTICA DE PRIVACIDAD
                                        </h2>

                                        <div class="space-y-4">
                                            <p class="text-justify">
                                                La privacidad es sumamente importante para FENCIA en su entorno FENLAB.
                                                Por ello, disponemos de una política que establece cómo se tratan y
                                                protegen tus datos personales, estableciendo las más estrictas medidas
                                                de seguridad y utilizando tu información con los fines claramente
                                                descritos.
                                            </p>

                                            <p class="text-justify">
                                                FENCIA PARTNERS, S.L. en materia de Privacidad cumple con las
                                                directrices de la Ley Orgánica 3/2018 de 5 de diciembre de Protección de
                                                Datos Personales y Garantía de Derechos Digitales así como con el
                                                Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de
                                                Abril de 2016.
                                            </p>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">1. Responsable del
                                                    tratamiento de sus datos</h3>
                                                <ul class="space-y-2 ml-4 text-gray-700">
                                                    <li>• <strong>Identidad:</strong> FENCIA PARTNERS, S.L.</li>
                                                    <li>• <strong>C.I.F:</strong> B-13731245</li>
                                                    <li>• <strong>Nombre comercial:</strong> FENCIA</li>
                                                    <li>• <strong>Plataforma:</strong> FENLAB</li>
                                                    <li>• <strong>Correo:</strong> <a href="mailto:info@fencia.es"
                                                            class="text-blue-600 underline hover:text-blue-800">info@fencia.es</a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">2. Finalidad del
                                                    tratamiento</h3>
                                                <p class="text-justify text-gray-700">
                                                    FENLAB trata la información que nos facilitan los usuarios con el
                                                    fin de prestar los servicios solicitados, consistentes en la
                                                    ejecución de modelos económicos de inversión y desinversión
                                                    crediticia e inmobiliaria.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">3. Plazo de
                                                    conservación</h3>
                                                <p class="text-justify text-gray-700">
                                                    Los datos se conservarán mientras se mantenga la relación comercial
                                                    y durante el tiempo necesario para cumplir con las obligaciones
                                                    legales.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">4. Derechos del
                                                    usuario</h3>
                                                <p class="text-justify text-gray-700">
                                                    Todo usuario tiene derecho a acceder, rectificar, suprimir y limitar
                                                    el tratamiento de sus datos personales. Para ejercer estos derechos
                                                    puede contactar con nosotros en <a href="mailto:info@fencia.es"
                                                        class="text-blue-600 underline hover:text-blue-800">info@fencia.es</a>.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">5. Medidas de
                                                    seguridad</h3>
                                                <p class="text-justify text-gray-700">
                                                    Aplicamos las medidas técnicas y organizativas apropiadas para
                                                    garantizar la seguridad de sus datos personales, incluyendo sistemas
                                                    de protección perimetral y acceso restringido.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">6. Legitimación</h3>
                                                <p class="text-justify text-gray-700">
                                                    FENCIA está legitimada para el tratamiento de los datos debido a la
                                                    relación comercial y contractual existente, consentida por el
                                                    usuario.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 class="font-semibold text-gray-800 mt-6 mb-3">7. Bases legales</h3>
                                                <p class="text-justify text-gray-700">
                                                    Con el registro al portal manifiesta su consentimiento y
                                                    autorización para el tratamiento de sus datos, siendo dicho
                                                    tratamiento necesario para que el contrato suscrito tenga contenido.
                                                </p>
                                            </div>

                                            <div class="bg-gray-50 p-4 rounded-lg mt-6">
                                                <p class="text-center text-sm text-gray-600">
                                                    Para cualquier pregunta relativa al uso de datos o reclamaciones,
                                                    puede contactarnos en:
                                                    <a href="mailto:info@fencia.es"
                                                        class="text-blue-600 underline hover:text-blue-800 font-medium">info@fencia.es</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
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
