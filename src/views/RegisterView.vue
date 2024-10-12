<script setup>
import LogoComponent from '@/components/LogoComponent.vue';
</script>

<template>
  <div class="flex flex-col items-center">
    <div>
      <LogoComponent class="mt-16 lg:mt-20" />

      <form class="mt-8 flex flex-col w-80">
        <h3 class="font-extrabold text-2xl text-slate-700">Sign Up</h3>
        <span class="text-slate-600 text-sm mt-1 mb-2">Do you have an account? <RouterLink to="/login" class="ptm-link">Sign In</RouterLink></span>
        <input class="ptm-input" type="email" name="email" placeholder="E-mail">
        <input class="ptm-input" type="text" name="username" placeholder="Username">
        <input class="ptm-input" type="password" name="password" placeholder="Password">
        <input class="ptm-input" type="password" name="password-again" placeholder="Password Again">
        <button class="ptm-button mt-3">Sign Up</button>
        <span class="text-xs text-slate-500 font-light text-center fixed bottom-4 pl-16">
          Developed by <a href="https://soltancode.com" class="hover:text-blue-700" target="_blank">Soltan
            Abilgasimzada</a>
        </span>
      </form>
    </div>
  </div>
</template>