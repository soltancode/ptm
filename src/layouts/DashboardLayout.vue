<script setup>
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
</script>

<template>
    <div class="container mx-auto">
        <Header />
        <slot />
        <Footer />
    </div>
</template>