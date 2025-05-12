import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import type { PendingNotary } from "@/Pages/MyPublications/types";
import { Badge } from "@/Components/ui/badge";

export const pendingNotaryColumns: ColumnDef<PendingNotary>[] = [
    {
        header: "ID FENCIA",
        accessorKey: "productReference",
        cell: (row) => {
            const id = row.getValue() as string;
            return h("p", { class: "w-[78px] truncate" }, id);
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
        header: "ESTADO",
        accessorKey: "stage",
        cell: (row) => {
            const stage = row.getValue() as string;
            return h(
                "div",
                { class: "font-medium" },
                h(Badge, { variant: "secondary" }, stage),
            );
        },
    },
];
