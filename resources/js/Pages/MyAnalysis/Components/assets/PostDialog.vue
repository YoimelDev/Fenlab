<script setup lang="ts">
import {  
    Button, 
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Input,
} from '@/Components/ui'
</script>

<template>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                ID cliente
            </DialogTitle>
        </DialogHeader>

        <div class="content">
            <div
                class="flex flex-col gap-4"
            >
                <Input
                    id="client_id"
                    type="text"
                    placeholder="ID cliente"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="client_id"
                />

                <Input
                    id="fenlab_id"
                    type="text"
                    placeholder="ID fenlab"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="fenlab_id"
                />

                <Input
                    id="cadastral_reference"
                    type="text"
                    placeholder="Referencia catastral"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="cadastral_reference"
                />

                <Input
                    id="min_price"
                    type="text"
                    placeholder="Precio mínimo"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="min_price"
                />

                <Input
                    id="reference_value"
                    type="text"
                    placeholder="Valor DE referencia"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="reference_value"
                />

                <Input
                    id="transaction_modality"
                    type="text"
                    placeholder="Modalidad de transacción"
                    class="mt-2"
                    required
                    autofocus
                    autocomplete="transaction_modality"
                />
            </div>
        </div>
    
        <DialogFooter class="flex justify-between mt-10">
            <Button 
                class="gap-1 w-full"
                variant="green"
                size="sm"
            >
                Publicar
            </Button>
        </DialogFooter>
    </DialogContent>
</template>