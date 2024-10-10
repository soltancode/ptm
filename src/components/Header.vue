<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="border-b border-blue-800 flex items-center p-4">
        <div class="flex items-center">
            <div class="pr-2 border-r-2 border-blue-800">
                <img src="@/assets/azericard.svg" alt="Azericard">
            </div>
            <span class="ml-2">PSM Project</span>
        </div>
        <nav class="ml-auto space-x-5 font-medium">
            <RouterLink class="hover:text-blue-700" to="/">Home</RouterLink>
            <RouterLink class="hover:text-blue-700" to="/about">About</RouterLink>
        </nav>
    </header>
</template>