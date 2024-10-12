<script setup>
import { RouterView } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue';
</script>

<template>
  <AppLayout>
    <RouterView class="my-5 px-4" />
  </AppLayout>
</template>