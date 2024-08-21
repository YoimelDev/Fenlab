<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import { Link } from '@inertiajs/vue3'

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import { PinLeftIcon, PinRightIcon } from '@radix-icons/vue'
import { HomeIcon, AssessmentIcon, HelpIcon, PersonIcon, PictureIcon, ReceiptIcon } from '@/Components/icons'

type collapse = boolean | string;

const separator = h('hr', {
    style: {
        borderColor: 'hsla(0, 0%, 93%, 1)',
    },
})

const menu = [
    {
        href: '/dashboard',
        title: 'Overview',
        icon: {
            element: h('div', [h(HomeIcon)]),
        },
    },
    {
        title: 'Mis Análisis',
        icon: {
            element: h('div', [h(AssessmentIcon)]),
        },
    },
    {
        component: separator,
    },
    {
        header: 'Fencia',
        class: 'mt-8 !px-0 !text-grey',
    },
    {
        title: 'Mis Publicaciones',
        icon: {
            element: h('div', [h(PictureIcon)]),
        },
    },
    {
        title: 'Pendientes Publicar',
        badge: {
            text: 7,
            class: 'grid place-items-center rounded-full text-xs bg-grey text-white h-[18px] w-[18px]',
        },
    },
    {
        title: 'Publicados',
    },
    {
        title: 'Pendientes Aprobación',
    },
    {
        title: 'Aprobación PBC',
    },
    {
        title: 'Pendientes Firma',
    },
    {
        title: 'Operaciones Cerradas',
        class: 'mb-8',
    },
    {
        component: separator,
    },
    {
        header: 'Nombre de usuario',
        class: 'mt-8 !text-grey',        
        hiddenOnCollapse: true,
    },
    {
        header: 'Empresa',
        class: '!py-0 !text-grey !font-light',
        hiddenOnCollapse: true,
    },
    {
        title: 'Cómo funciona',
        class: 'mt-8',
        icon: {
            element: h('div', [h(HelpIcon)]),
        },
    },
    {
        title: 'Facturación',
        icon: {
            element: h('div', [h(ReceiptIcon)]),
        },
    },
    {
        title: 'Datos Usuario',
        icon: {
            element: h('div', [h(PersonIcon)]),
        },
    },
]

const isCollapsed = ref<collapse>(JSON.parse(localStorage.getItem('collapse') || 'false'))

const onToggleCollapse = (collapsed: boolean) => {
    isCollapsed.value = collapsed
    localStorage.setItem('collapse', JSON.stringify(collapsed))
}

onMounted(() => {
    const collapseFromStorage = localStorage.getItem('collapse')
    if (collapseFromStorage) {
        isCollapsed.value = JSON.parse(  collapseFromStorage )
    }
})

</script>

<template>
    <div>
        <sidebar-menu
            :menu="menu"
            @update:collapsed="onToggleCollapse"
            :collapsed="isCollapsed"
            :link-component-name="Link"
            width-collapsed="100px"
            width="256px"
            class="px-4 pt-6 !bg-white border-r border-border-primary"
        >
            <template #header>
                <div class="flex justify-start w-full mb-10">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <Link :href="route('dashboard')">
                                <ApplicationLogo
                                    class="transition-all duration-300"
                                    :class="{
                                        'w-16': isCollapsed,
                                    }"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </template>

            <template #toggle-icon>
                <PinRightIcon 
                    v-if="isCollapsed"
                    class="w-6 h-6 text-electric-green"
                />

                <PinLeftIcon 
                    v-else
                    class="w-6 h-6 text-electric-green"
                />
            </template>
        </sidebar-menu>

        <!-- Page Content -->
        <main
            class="min-h-screen bg-chalk transition-padding duration-300"
            :class="{
                'pl-[100px]': isCollapsed,
                'pl-[256px]': !isCollapsed,
            }"
        >
            <div class="container p-10">
                <slot />
            </div>
        </main>
    </div>
</template>
