import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { PostData, type PendingNotary } from "@/Pages/MyPublications/types";
import { Badge, badgeMap, type BadgeMode } from "@/Components/ui/badge";
import { PostAction } from "../PostAction";
import { formatCurrency } from "@/lib/utils";
import { usePage } from "@inertiajs/vue3";
import { PageProps } from "@/types";

const page = usePage<PageProps>();
const isAdmin = page.props?.auth?.salesforceUser?.rols === "Admin";

const baseColumns: ColumnDef<PendingNotary>[] = [
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
        header: "PRECIO",
        accessorKey: "offerValue",
        cell: (row) => {
            const price = row.getValue() as number;

            if (price) {
                return h(
                    "p",
                    { class: "font-medium text-right" },
                    formatCurrency(price),
                );
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "NOTARIA",
        accessorKey: "notary",
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
        header: "Fecha firma",
        accessorKey: "signatureDate",
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
        id: "actions",
        header: () => "",
        accessorKey: "id",
        cell: (row) => {
            const postData: PostData = {
                postType: "pendingNotary",
                data: row.row.original,
                endpoint: "/salesforce/accept-notary",
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
