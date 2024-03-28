<script setup lang="ts">
import Toast from "primevue/toast"
</script>

<template>
    <main class="grid min-h-screen w-screen place-items-center bg-slate-700 text-slate-50">
        <div class="min-h-[50rem] w-[90vw] max-w-[80rem] rounded-xl p-8">
            <slot />
        </div>

        <Toast
            group="br"
            position="bottom-right"
        />
    </main>
</template>
