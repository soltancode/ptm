<script setup>
import { ref } from 'vue';
import LogoComponent from '@/components/LogoComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const username = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const loading = ref(false);

const errorMessage = ref(null);

const router = useRouter();
const authStore = useAuthStore();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const register = async () => {
  const payload = {
    email: email.value,
    username: username.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value
  };

  if (email.value == "" || username.value == "" || password.value == "" || passwordConfirmation.value == "") {
    errorMessage.value = "Please enter all fields."
    return;
  }

  errorMessage.value = null;

  loading.value = true;
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  loading.value = false;

  const data = await response.json();

  if (response.status == 201) {
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
    <div v-if="loading" class="overlay z-20">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
    <div>
      <LogoComponent class="mt-16 lg:mt-20" />

      <form @submit.prevent="register" class="mt-8 flex flex-col w-80">
        <h3 class="font-extrabold text-2xl text-slate-700">Sign Up</h3>
        <div v-if="errorMessage" class="text-xs my-2 bg-red-500 p-2 rounded-3xl text-white">
          <p>{{ errorMessage }}</p>
        </div>
        <span class="text-slate-600 text-sm mt-1 mb-2">
          Do you have an account? 
          <RouterLink to="/login" class="ptm-link">
            Sign In
          </RouterLink>
        </span>
        <input v-model="email" class="ptm-input" type="email" name="email" placeholder="E-mail">
        <input v-model="username" class="ptm-input" type="text" name="username" placeholder="Username">
        <input v-model="password" class="ptm-input" type="password" name="password" placeholder="Password">
        <input v-model="passwordConfirmation" class="ptm-input" type="password" name="password-again" placeholder="Password Again">
        <button class="ptm-button mt-3">Sign Up</button>
        <span class="text-xs text-slate-500 font-light text-center fixed bottom-4 pl-16">
          Developed by <a href="https://soltancode.com" class="hover:text-blue-700" target="_blank">Soltan
            Abilgasimzada</a>
        </span>
      </form>
    </div>
  </div>
</template>