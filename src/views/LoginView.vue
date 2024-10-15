<script setup>
import { ref } from 'vue';
import LogoComponent from '@/components/LogoComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref(null);

const router = useRouter();
const authStore = useAuthStore();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const login = async () => {
  const payload = {
    email: email.value,
    password: password.value
  };

  if (email.value == "" || password.value == "") {
    errorMessage.value = "Please enter all fields."
    return;
  }

  errorMessage.value = null;

  const response = await fetch(`${apiBaseUrl}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (response.status == 200) {
    localStorage.setItem('username', data.user.name);
    authStore.setToken(data.token);
    router.push('/');
  } else {
    errorMessage.value = data.message;
  }
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div>
      <LogoComponent class="mt-16 lg:mt-20" />

      <form @submit.prevent="login" class="mt-8 flex flex-col w-80">
        <h3 class="font-extrabold text-2xl text-slate-700">Sign In</h3>
        <span class="text-slate-600 text-sm mt-1 mb-2">
          Don't have an account? 
          <RouterLink to="/register" class="ptm-link">
            Sign Up
          </RouterLink>
        </span>
        <div v-if="errorMessage" class="text-xs my-2 bg-red-500 p-2 rounded-3xl text-white">
          <p>{{ errorMessage }}</p>
        </div>
        <input v-model="email" class="ptm-input" type="email" name="email" placeholder="E-mail">
        <input v-model="password" class="ptm-input" type="password" name="password" placeholder="Password">
        <button type="submit" class="ptm-button mt-3">Sign In</button>
        <span class="text-xs text-slate-500 font-light text-center fixed bottom-4 pl-16">
          Developed by <a href="https://soltancode.com" class="hover:text-blue-700" target="_blank">Soltan
            Abilgasimzada</a>
        </span>
      </form>
    </div>
  </div>
</template>