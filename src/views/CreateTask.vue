<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref(null);
const authStore = useAuthStore();

const title = ref("");
const description = ref("");
const status = ref(0);
const dueDate = ref("");

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const createTask = async () => {
  const payload = {
    title: title.value,
    description: description.value,
    due_date: dueDate.value,
    status: status.value
  };

  errorMessage.value = null;

  const response = await fetch(`${apiBaseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.getToken
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (response.status == 201) {
    router.push('/');
  } else {
    errorMessage.value = data.message;
  }
};
</script>

<template>
  <div>
    <div v-if="loading" class="overlay z-20">
      <div class="overlay__inner">
        <div class="overlay__content"><span class="spinner"></span></div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row items-center justify-between">
      <div class="flex justify-between w-full">
        <div class="flex flex-col lg:flex-row lg:items-center">
          <div class="flex flex-col lg:flex-row items-center">
            <h1 class="text-2xl font-semibold">Create New Task</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <form @submit.prevent="createTask()">
        <div v-if="errorMessage" class="text-xs my-2 bg-red-500 p-2 rounded-3xl text-white">
          <p>{{ errorMessage }}</p>
        </div>
        <div class="flex flex-col lg:flex-row lg:space-x-4">
          <input v-model="title" type="text" class="ptm-input" placeholder="Title">
          <input v-model="description" type="text" class="ptm-input" placeholder="Description">
          <input v-model="dueDate" type="date" class="ptm-input" placeholder="Due Date">
          <div>
            <select v-model="status" class="ptm-input min-h-11 w-full lg:w-fit">
              <option value="0">To Do</option>
              <option value="1">In Progress</option>
              <option value="2">Completed</option>
            </select>
          </div>
        </div>
        <button type="submit" class="ptm-button mt-2 w-full lg:w-fit">Create</button>
      </form>
    </div>
  </div>
</template>