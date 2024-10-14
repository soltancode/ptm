<script setup>
import { onMounted, ref } from 'vue';
import TaskCardComponent from '@/components/TaskCardComponent.vue';
import DropdownIconComponent from '@/components/DropdownIconComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useTasksStore } from '@/stores/tasks';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const loading = ref(false);

const page = ref(1);
const status = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const search = ref("");
const sortDate = ref(null);
const sortStatus = ref(null);

const fetchData = async () => {
  const params = new URLSearchParams();

  if (page.value !== null) params.append('page', page.value);
  if (search.value !== "") params.append('search', search.value);
  if (sortDate.value !== null) params.append('sort_date', sortDate.value);
  if (sortStatus.value !== null) params.append('sort_status', sortStatus.value);
  if (status.value !== null) params.append('status', status.value);
  if (startDate.value !== null) params.append('start_date', startDate.value);
  if (endDate.value !== null) params.append('end_date', endDate.value);

  loading.value = true;

  const response = await fetch(`${apiBaseUrl}/tasks?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authStore.getToken
    }
  });

  const data = await response.json();
  loading.value = false;

  if (response.status == 200) {
    tasksStore.tasks = data.data.data;
  }
};

const searchTrigger = () => {
  fetchData();
}

onMounted(() => {
  if (tasksStore.tasks === null) {
    fetchData();
  }
})
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
            <h1 class="text-2xl font-semibold">Tasks</h1>
            <form @submit.prevent="searchTrigger()">
              <input v-model="search" class="text-sm bg-slate-50 border border-slate-200 rounded-3xl px-3 py-1 hidden lg:block ml-4" type="text"
                placeholder="Search...">
            </form>
          </div>
        </div>
        <button class="create-btn lg:hidden">Create Task</button>
      </div>
      <div class="flex w-full flex-col lg:flex-row lg:justify-end">
        <form @submit.prevent="searchTrigger()">
          <input v-model="search" class="w-full text-sm bg-slate-200 rounded-3xl px-3 py-2 lg:hidden mt-4" type="text" placeholder="Search...">
        </form>

        <div class="space-x-2 w-fit flex items-center justify-start lg:justify-end mt-4 lg:mt-0 lg:border-r lg:border-r-slate-200 lg:pr-4 lg:mr-4">
          <span class="text-xs text-slate-500">Sort by:</span>
          <button
            class="text-nowrap border bg-slate-50 border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            <DropdownIconComponent class="w-4 mr-1 mt-px" />
            Date
          </button>
          <button class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            <DropdownIconComponent class="w-4 mr-1 mt-px hidden" />
            Status
          </button>
        </div>

        <div class="space-x-2 w-fit flex items-center justify-start lg:justify-end mt-4 lg:mt-0">
          <span class="text-xs text-slate-500">Filters:</span>
          <button class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            All Statuses
            <DropdownIconComponent class="w-4 ml-1 mt-px" />
          </button>
          <button class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            All Time
            <DropdownIconComponent class="w-4 ml-1 mt-px" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TaskCardComponent :task="task" v-for="task in tasksStore.tasks" />
      <div
        class="border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100 p-5 rounded-3xl flex items-center flex-col justify-center">
        <span class="font-semibold text-8xl text-slate-200">+</span>
        <span class="text-sm text-slate-300 mb-6">Create New Task</span>
      </div>
    </div>
  </div>
</template>