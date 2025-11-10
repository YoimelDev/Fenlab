import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { AssetData } from "@/Pages/MyAnalysis/types";
import { Badge, badgeMap, type BadgeMode } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { AssetActions } from "@/Pages/MyAnalysis/Components/assets/";
import { formatCurrency } from "@/lib/utils";
import { fenlabApi } from "@/api";
import { toast } from "@/Components/ui";
import { IndividualAsset } from "@/Pages/MyAnalysis/types/individualAsset";

// Columnas comunes
const commonColumns: ColumnDef<AssetData>[] = [
    {
        header: "ID cliente",
        accessorKey: "clientId",
        meta: "!w-[78px]",
        cell: (row) => {
            const client_id = row.getValue() as string;
            return h("p", { class: "w-[224px] truncate" }, client_id);
        },
    },
    {
        header: "ID fenlab",
        accessorKey: "fenciaId",
    },
    {
        header: "ESTADO",
        accessorKey: "status",
        cell: (row) => {
            const status = row.getValue() as BadgeMode;
            return h(
                "div",
                { class: "font-medium" },
                h(Badge, { variant: badgeMap[status] }, status || "-"),
            );
        },
    },
];

// Columnas específicas para NPL
const nplColumns: ColumnDef<AssetData>[] = [
    ...commonColumns.slice(0, 3), // ID cliente, ID fenlab, ESTADO
    {
        header: "PROVINCIA",
        accessorKey: "provincia",
        cell: (row) => {
            const provincia = row.getValue() as string;
            return h("p", { class: "font-medium" }, provincia || "-");
        },
    },
    {
        header: "DEUDA",
        accessorKey: "deuda",
        cell: (row) => {
            const deuda = row.getValue() as number;
            if (deuda) {
                return h("p", { class: "font-medium" }, formatCurrency(deuda));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "VALOR MERCADO",
        accessorKey: "valorMercado",
        cell: (row) => {
            const valor = row.getValue() as number;
            if (valor) {
                return h("p", { class: "font-medium" }, formatCurrency(valor));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "FASE JUDICIAL",
        accessorKey: "faseJudicial",
        cell: (row) => {
            const fase = row.getValue() as string;
            return h("p", { class: "font-medium" }, fase || "-");
        },
    },
    {
        header: "PRECIO PROPUESTO",
        accessorKey: "precioPropuesto",
        cell: (row) => {
            const price = row.getValue() as number;
            if (price) {
                return h("p", { class: "font-medium" }, formatCurrency(price));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "FICHA",
        accessorKey: "pdf",
        cell: (row) => {
            const asset = row.row.original;
            const pdfData = row.getValue() as any;

            const downloadAsset = async () => {
                try {
                    if (pdfData && pdfData.url) {
                        window.open(pdfData.url, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    } else {
                        // Fallback a la API anterior si no hay URL directa
                        const { data } = await fenlabApi.post<IndividualAsset>(
                            "",
                            {
                                method: "get",
                                path: `projects/${asset.projectId}/assets/${asset.id}`,
                            },
                        );
                        const pdfURL = data.assetPdf.url;
                        window.open(pdfURL, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    }
                } catch (error) {
                    toast({
                        variant: "danger",
                        title: "Error downloading asset",
                    });
                }
            };

            return h(
                Button,
                {
                    variant: "ghost",
                    size: "xs",
                    onClick: downloadAsset,
                },
                () => "Descargar",
            );
        },
    },
    {
        header: "SOLICITAR PUBLICACIÓN",
        accessorKey: "id",
        cell: (row) => {
            const asset = row.row.original;
            if (asset.npl?.credito?.isPublishable === true)
                return h(
                    "p",
                    { class: "text-green-600 font-medium" },
                    "Publicado",
                );

            return h(AssetActions, {
                asset: asset,
            });
        },
    },
];

// Columnas específicas para REO
const reoColumns: ColumnDef<AssetData>[] = [
    ...commonColumns.slice(0, 3), // ID cliente, ID fenlab, ESTADO
    {
        header: "TIPO OCUPANTE",
        accessorKey: "tipoOcupante",
        cell: (row) => {
            const tipo = row.getValue() as string;
            return h("p", { class: "font-medium" }, tipo || "-");
        },
    },
    {
        header: "PROVINCIA",
        accessorKey: "provincia",
        cell: (row) => {
            const provincia = row.getValue() as string;
            return h("p", { class: "font-medium" }, provincia || "-");
        },
    },
    {
        header: "VALOR MERCADO",
        accessorKey: "valorMercado",
        cell: (row) => {
            const valor = row.getValue() as number;
            if (valor) {
                return h("p", { class: "font-medium" }, formatCurrency(valor));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "PRECIO PROPUESTO",
        accessorKey: "precioPropuesto",
        cell: (row) => {
            const price = row.getValue() as number;
            if (price) {
                return h("p", { class: "font-medium" }, formatCurrency(price));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "FICHA",
        accessorKey: "pdf",
        cell: (row) => {
            const asset = row.row.original;
            const pdfData = row.getValue() as any;

            const downloadAsset = async () => {
                try {
                    if (pdfData && pdfData.url) {
                        window.open(pdfData.url, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    } else {
                        // Fallback a la API anterior si no hay URL directa
                        const { data } = await fenlabApi.post<IndividualAsset>(
                            "",
                            {
                                method: "get",
                                path: `projects/${asset.projectId}/assets/${asset.id}`,
                            },
                        );
                        const pdfURL = data.assetPdf.url;
                        window.open(pdfURL, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    }
                } catch (error) {
                    toast({
                        variant: "danger",
                        title: "Error downloading asset",
                    });
                }
            };

            return h(
                Button,
                {
                    variant: "ghost",
                    size: "xs",
                    onClick: downloadAsset,
                },
                () => "Descargar",
            );
        },
    },
    {
        header: "SOLICITAR PUBLICACIÓN",
        accessorKey: "id",
        cell: (row) => {
            const asset = row.row.original;
            if (asset.reo?.isPublishable === true)
                return h(
                    "p",
                    { class: "text-green-600 font-medium" },
                    "Publicado",
                );

            return h(AssetActions, {
                asset: asset,
            });
        },
    },
];

// Columnas específicas para NPL Buy
const nplBuyColumns: ColumnDef<AssetData>[] = [
    ...commonColumns.slice(0, 3), // ID cliente, ID fenlab, ESTADO
    {
        header: "PRECIO COMPRA",
        accessorKey: "precioCompra",
        cell: (row) => {
            const precio = row.getValue() as number;
            if (precio) {
                return h("p", { class: "font-medium" }, formatCurrency(precio));
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "MODALIDAD COMPRA",
        accessorKey: "modalidadCompra",
        cell: (row) => {
            const modalidad = row.getValue() as string;
            return h("p", { class: "font-medium" }, modalidad || "-");
        },
    },
    {
        header: "FASE JUDICIAL",
        accessorKey: "faseJudicial",
        cell: (row) => {
            const fase = row.getValue() as string;
            return h("p", { class: "font-medium" }, fase || "-");
        },
    },
    {
        header: "TIR BRUTA",
        accessorKey: "tirBruta",
        cell: (row) => {
            const tir = row.getValue() as number;
            if (tir !== null && tir !== undefined) {
                return h("p", { class: "font-medium" }, `${tir.toFixed(2)}%`);
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
    {
        header: "OUTPUT FENLAB",
        accessorKey: "pdf",
        cell: (row) => {
            const asset = row.row.original;
            const pdfData = row.getValue() as any;

            const downloadAsset = async () => {
                try {
                    if (pdfData && pdfData.url) {
                        window.open(pdfData.url, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    } else {
                        // Fallback a la API anterior si no hay URL directa
                        const { data } = await fenlabApi.post<IndividualAsset>(
                            "",
                            {
                                method: "get",
                                path: `projects/${asset.projectId}/assets/${asset.id}`,
                            },
                        );
                        const pdfURL = data.assetPdf.url;
                        window.open(pdfURL, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Asset downloaded successfully",
                        });
                    }
                } catch (error) {
                    toast({
                        variant: "danger",
                        title: "Error downloading asset",
                    });
                }
            };

            return h(
                Button,
                {
                    variant: "ghost",
                    size: "xs",
                    onClick: downloadAsset,
                },
                () => "Descargar",
            );
        },
    },
    {
        header: "DECK",
        accessorKey: "deck",
        cell: (row) => {
            const asset = row.row.original;
            const deckData = row.getValue() as any;

            const downloadDeck = async () => {
                try {
                    if (deckData && deckData.url) {
                        window.open(deckData.url, "_blank", "noopener");
                        toast({
                            variant: "info",
                            title: "Deck downloaded successfully",
                        });
                    } else {
                        toast({
                            variant: "danger",
                            title: "Deck not available",
                        });
                    }
                } catch (error) {
                    toast({
                        variant: "danger",
                        title: "Error downloading deck",
                    });
                }
            };

            if (deckData && deckData.url) {
                return h(
                    Button,
                    {
                        variant: "ghost",
                        size: "xs",
                        onClick: downloadDeck,
                    },
                    () => "Descargar",
                );
            }
            return h("p", { class: "font-medium" }, "-");
        },
    },
];

// Función para obtener las columnas según el tipo de modelo
export const getColumnsForModelType = (
    modelType: "NPL" | "REO" | "NPL_BUY",
): ColumnDef<AssetData>[] => {
    if (modelType === "NPL_BUY") return nplBuyColumns;
    return modelType === "NPL" ? nplColumns : reoColumns;
};

// Columnas por defecto (mantener compatibilidad)
export const columns: ColumnDef<AssetData>[] = nplColumns;
