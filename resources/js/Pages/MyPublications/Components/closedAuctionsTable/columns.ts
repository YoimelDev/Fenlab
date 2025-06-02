import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { type ClosedAuctions } from "@/Pages/MyPublications/types";
import { Badge, badgeMap, type BadgeMode } from "@/Components/ui/badge";
import { usePage } from "@inertiajs/vue3";
import { PageProps } from "@/types";

const page = usePage<PageProps>();
const isAdmin = page.props?.auth?.salesforceUser?.rols === "Admin";

export const baseColumns: ColumnDef<ClosedAuctions>[] = [
    {
        header: "ID CLIENTE",
        accessorKey: "idCliente",
    },
    {
        header: "ID FENCIA",
        accessorKey: "productReference",
    },
    {
        header: "NOMBRE PROYECTO",
        accessorKey: "name",
        cell: (row) => {
            const name = row.getValue() as string;
            return h("p", { class: "font-bold" }, name);
        },
    },
    {
        header: "NOTARIA",
        accessorKey: "notary",
    },
    {
        header: "FECHA FIRMA",
        accessorKey: "dateSignature",
    },
    {
        header: "ESTADO",
        accessorKey: "stage",
        cell: (row) => {
            const stage = row.getValue() as BadgeMode;
            return h(
                "div",
                { class: "font-medium" },
                h(Badge, { variant: badgeMap[stage] }, stage),
            );
        },
    },
];

if (isAdmin) {
    baseColumns.splice(1, 0, {
        header: "EMPRESA",
        accessorKey: "companyName",
    });
}

export const columns = baseColumns;
