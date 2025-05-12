import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { Badge, badgeMap, type BadgeMode } from "@/Components/ui/badge";
import { useDateFormat } from "@vueuse/core";
import { Auction } from "@/Pages/MyPublications/types";
import { RecordType, recordTypeLabels } from "@/constants/recordTypes";

export const publishedColumns: ColumnDef<Auction>[] = [
    {
        header: "ID FENCIA",
        accessorKey: "productReference",
        cell: (row) => {
            const id = row.getValue() as string;
            return h("p", { class: "w-[78px] truncate" }, id);
        },
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
        header: () => h("div", { class: "w-[78px]" }, "TIPO"),
        accessorKey: "recordType",
        cell: (row) => {
            const type = row.getValue() as RecordType;
            return h(
                "p",
                { class: "text-grey" },
                recordTypeLabels[type] || type,
            );
        },
    },
    {
        header: "PUBLICACIÓN",
        accessorKey: "startDate",
        cell: (row) => {
            const date = row.getValue() as string;
            const formatted = useDateFormat(date, "DD/MM/YYYY");
            return h("p", { class: "text-grey text-right" }, formatted.value);
        },
    },
    {
        header: "Nº OFERTAS",
        accessorKey: "numberOfBids",
    },
];
