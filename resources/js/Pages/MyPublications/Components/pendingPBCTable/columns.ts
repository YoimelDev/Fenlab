import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { PostData, type PendingPBC } from "@/Pages/MyPublications/types";
import { Badge, badgeMap, type BadgeMode } from "@/Components/ui/badge";
import { PostAction } from "../PostAction";
import { usePage } from "@inertiajs/vue3";
import { PageProps } from "@/types";

const page = usePage<PageProps>();
const isAdmin = page.props?.auth?.salesforceUser?.rols === "Admin";

const baseColumns: ColumnDef<PendingPBC>[] = [
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
        header: "OFERTA ACEPTADA",
        accessorKey: "offerValue",
    },
    {
        header: "TIPO PBC",
        accessorKey: "PBCtype",
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
    {
        header: "FECHA APROBACIÓN PBC",
        accessorKey: "submittedPBCDate",
        cell: (row) => {
            const date = row.getValue() as string;
            if (!date) return h("p", { class: "font-medium" }, "-");

            // Formatear la fecha (DD/MM/YYYY)
            const formattedDate = new Date(date).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            return h("p", { class: "font-medium" }, formattedDate);
        },
    },
    {
        header: "FECHA APROBACIÓN PBC2",
        accessorKey: "submittedPBC2Date",
        cell: (row) => {
            const date = row.getValue();
            return date ? date : "-";
        },
    },
    {
        id: "actions",
        header: () => "",
        accessorKey: "id",
        cell: (row) => {
            const postData: PostData = {
                postType: "pendingPBC",
                data: row.row.original,
                endpoint: "/salesforce/approve-pbc",
            };

            return h(PostAction, {
                postData,
            });
        },
    },
];

if (isAdmin) {
    baseColumns.splice(1, 0, {
        header: "EMPRESA",
        accessorKey: "titular",
    });
}

export const columns = baseColumns;
