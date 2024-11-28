<script setup lang="ts">
import { h } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useLocalStorage } from '@vueuse/core'

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import ApplicationLogo from '@/Components/ApplicationLogo.vue'
import { PinLeftIcon, PinRightIcon } from '@radix-icons/vue'
import { HomeIcon, AssessmentIcon, HelpIcon, PersonIcon, PictureIcon } from '@/Components/icons'
import { PageProps } from '@/types'

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
        href: '/my-analysis',
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
        href: '/my-publications',
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
        icon: {},
    },
    {
        title: 'Publicados',  
        icon: {},
    },
    {
        title: 'Pendientes Aprobación',
        icon: {},
    },
    {
        title: 'Aprobación PBC',
        icon: {},
    },
    {
        title: 'Pendientes Firma',
        icon: {},
    },
    {
        title: 'Operaciones Cerradas',
        class: 'mb-8',
        icon: {},
    },
    {
        component: separator,
    },
    {
        header: usePage<PageProps>()?.props?.auth?.salesforceUser?.name || 'Usuario',
        class: 'mt-8 !text-grey',        
        hiddenOnCollapse: true,
    },
    {
        header: usePage<PageProps>()?.props?.auth?.salesforceUser?.companyCommercialName || 'Empresa',
        class: '!py-0 !text-grey !font-light',
        hiddenOnCollapse: true,
    },
    {
        href: '/how-it-works',
        title: 'Cómo funciona',
        class: 'mt-8',
        icon: {
            element: h('div', [h(HelpIcon)]),
        },
    },
    {
        href: '/user-data',
        title: 'Datos Usuario',
        icon: {
            element: h('div', [h(PersonIcon)]),
        },
    },
]

const isCollapsed = useLocalStorage<collapse>('collapse', false)

const onToggleCollapse = (collapsed: boolean) => {
    isCollapsed.value = collapsed
}
</script>

<template>
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
</template>
