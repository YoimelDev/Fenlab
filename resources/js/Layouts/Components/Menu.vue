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
import { Button } from '@/Components/ui'

type collapse = boolean | string;

const separator = h('hr', {
    style: {
        borderColor: 'hsla(0, 0%, 93%, 1)',
    },
})

const page = usePage<PageProps>()

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
        title: 'Mis Publicaciones',
        icon: {
            element: h('div', [h(PictureIcon)]),
        },
    },
    {
        href: '/my-publications/pending',
        title: 'Pendientes Publicar',
        badge: {
            text: page.props.publishablePendingCount + '',
            class: 'grid place-items-center rounded-full text-xs bg-grey text-white h-[18px] w-[18px]',
        },
        icon: {},
    },
    {
        href: '/my-publications/published',
        title: 'Publicados',
        icon: {},
    },
    {
        href: '/my-publications/pending-approval',
        title: 'Pendientes Aprobación',
        icon: {},
    },
    {
        href: '/my-publications/pending-pbc',
        title: 'Aprobación PBC',
        icon: {},
    },
    {
        href: '/my-publications/pending-notary',
        title: 'Pendientes Firma',
        icon: {},
    },
    {
        href: '/my-publications/closed-auctions',
        title: 'Operaciones Cerradas',
        class: 'mb-8',
        icon: {},
    },
    {
        component: separator,
    },
    {
        header: page.props?.auth?.salesforceUser?.name || 'Usuario',
        class: 'mt-8 !text-grey',
        hiddenOnCollapse: true,
    },
    {
        header: page.props?.auth?.salesforceUser?.companyCommercialName || 'Empresa',
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
    <sidebar-menu :menu="menu" @update:collapsed="onToggleCollapse" :collapsed="false" hideToggle
        :link-component-name="Link" width-collapsed="100px" width="256px"
        class="px-4 pt-6 !bg-white border-r border-border-primary">
        <template #header>
            <div class="flex justify-start w-full mb-10">
                <div class="flex">
                    <!-- Logo -->
                    <div class="shrink-0 flex items-center">
                        <Link :href="route('dashboard')">
                        <ApplicationLogo class="transition-all duration-300" :class="{
                            'w-16': isCollapsed,
                        }" />
                        </Link>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <div class="w-full flex items-center justify-center space-x-1 mt-auto mb-4">
                <Button class="text-grey p-0" as-child variant="ghost" size="xs">
                    <Link :href="route('logout')" method="post">
                    Cerrar Sesión
                    </Link>
                </Button>
            </div>
        </template>

        <!-- <template #toggle-icon>
            <PinRightIcon v-if="isCollapsed" class="w-6 h-6 text-electric-green" />

            <PinLeftIcon v-else class="w-6 h-6 text-electric-green" />
        </template> -->
    </sidebar-menu>
</template>
