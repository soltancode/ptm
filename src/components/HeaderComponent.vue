<script setup>
import { RouterLink } from 'vue-router'
import LogoComponent from './LogoComponent.vue';
</script>

<template>
    <header class="flex items-center p-4">
        <LogoComponent />
        <nav class="ml-auto space-x-5 text-sm flex flex-col lg:flex-row items-end lg:items-center space-y-px">
            <span class="text-slate-400 font-light">Hi, <span class="text-slate-800 font-medium">Soltan!</span></span>
            <RouterLink class="hover:text-blue-700 font-light text-slate-500 cursor-pointer" to="/login">Log out</RouterLink>
            <button class="create-btn hidden lg:block">Create</button>
        </nav>
    </header>
</template>