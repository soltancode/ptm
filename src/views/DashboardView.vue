<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import TaskCardComponent from '@/components/TaskCardComponent.vue';
import DropdownIconComponent from '@/components/DropdownIconComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useTasksStore } from '@/stores/tasks';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router';
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const pieData = {
  labels: ['To Do', 'In Progress', 'Completed'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [0, 0, 0]
    }
  ]
};
const pieOptions = {
  responsive: false,
  maintainAspectRatio: false
};
const router = useRouter();
const date = ref();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const authStore = useAuthStore();
const tasksStore = useTasksStore();
const loading = ref(false);

const statusDropdown = ref(null)
const statusDropdownOpen = ref(false)

const lastPage = ref(10);

const page = ref(1);
const status = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const search = ref("");
const sortDate = ref(null);
const sortStatus = ref(null);

const handleDate = (modelData) => {
  date.value = modelData;

  if (modelData !== null) {
    startDate.value = convertDateFormat(modelData[0]);
    endDate.value = convertDateFormat(modelData[1]);
  } else {
    startDate.value = null;
    endDate.value = null;
  }

  fetchData();
}

const convertDateFormat = (theDate) => {
  const date = new Date(theDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

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

  for (let i in data.report) {
    if (data.report[i].status == 0) {
      pieData.datasets[0].data[0] = data.report[i].total
    } else if (data.report[i].status == 1) {
      pieData.datasets[0].data[1] = data.report[i].total
    } else if (data.report[i].status == 2) {
      pieData.datasets[0].data[2] = data.report[i].total
    }
  }

  loading.value = false;

  if (response.status == 200) {
    tasksStore.tasks = data.data.data;
    lastPage.value = data.data.last_page;
  } else if (response.status == 401) {
    authStore.clearToken()
    router.push('/login');
  }
};

const searchTrigger = () => {
  fetchData();
}

const sortByStatusTrigger = () => {
  sortDate.value = null;

  if (sortStatus.value === null) {
    sortStatus.value = "DESC";
  } else if (sortStatus.value === "DESC") {
    sortStatus.value = "ASC";
  } else if (sortStatus.value === "ASC") {
    sortStatus.value = "DESC";
  }

  fetchData();
}

const sortByDateTrigger = () => {
  sortStatus.value = null;

  if (sortDate.value === null) {
    sortDate.value = "DESC";
  } else if (sortDate.value === "DESC") {
    sortDate.value = "ASC";
  } else if (sortDate.value === "ASC") {
    sortDate.value = "DESC";
  }

  fetchData();
}

const statusFilterTrigger = (statusOption) => {
  status.value = statusOption;
  statusDropdownOpen.value = false;

  fetchData();
}

const changePage = (pageNumber) => {
  page.value = pageNumber;

  fetchData();
}

const handleClickOutside = (event) => {
  if (statusDropdown.value && !statusDropdown.value.contains(event.target)) {
    statusDropdownOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)

  if (tasksStore.tasks === null) {
    fetchData();
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  tasksStore.tasks = null;
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
              <input v-model="search"
                class="text-sm bg-slate-50 border border-slate-200 rounded-3xl px-3 py-1 hidden lg:block ml-4"
                type="text" placeholder="Search...">
            </form>
          </div>
        </div>
        <RouterLink to="/create">
          <button class="create-btn lg:hidden">Create Task</button>
        </RouterLink>
      </div>
      <div class="flex w-full flex-col lg:flex-row lg:justify-end">
        <form @submit.prevent="searchTrigger()">
          <input v-model="search"
            class="w-full text-sm bg-slate-50 border border-slate-200 rounded-3xl px-3 py-2 lg:hidden mt-4" type="text"
            placeholder="Search...">
        </form>

        <div
          class="space-x-2 w-fit flex items-center justify-start lg:justify-end mt-4 lg:mt-0 lg:border-r lg:border-r-slate-200 lg:pr-4 lg:mr-4">
          <span class="text-xs text-slate-500">Sort by:</span>
          <button @click="sortByDateTrigger()" :class="{ 'bg-slate-50': sortDate }"
            class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            <DropdownIconComponent v-if="sortDate" :class="{ 'rotate-180': sortDate == 'ASC' }"
              class="w-4 mr-1 mt-px" />
            Date
          </button>
          <button @click="sortByStatusTrigger()" :class="{ 'bg-slate-50': sortStatus }"
            class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
            <DropdownIconComponent v-if="sortStatus" :class="{ 'rotate-180': sortStatus == 'ASC' }"
              class="w-4 mr-1 mt-px" />
            Status
          </button>
        </div>

        <div class="space-x-2 w-fit flex items-center justify-start lg:justify-end mt-4 lg:mt-0">
          <span class="text-xs text-slate-500">Filters:</span>

          <div ref="statusDropdown" class="relative z-40">
            <button @click="statusDropdownOpen = !statusDropdownOpen"
              class="text-nowrap border border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
              <span v-if="status === null">All Statuses</span>
              <span v-else-if="status == 0">To Do</span>
              <span v-else-if="status == 1">In Progress</span>
              <span v-else-if="status == 2">Completed</span>
              <DropdownIconComponent class="w-4 ml-1 mt-px" />
            </button>
            <div v-if="statusDropdownOpen"
              class="border border-slate-100 w-28 bg-white rounded-xl text-xs p-2 absolute top-8 right-0">
              <ul class="space-y-1">
                <li @click="statusFilterTrigger(null)" :class="{ 'text-blue-700': status === null }"
                  class="cursor-pointer hover:text-blue-600">All Statuses</li>
                <li @click="statusFilterTrigger(0)" :class="{ 'text-blue-700': status === 0 }"
                  class="cursor-pointer hover:text-blue-600">To Do</li>
                <li @click="statusFilterTrigger(1)" :class="{ 'text-blue-700': status === 1 }"
                  class="cursor-pointer hover:text-blue-600">In Progress</li>
                <li @click="statusFilterTrigger(2)" :class="{ 'text-blue-700': status === 2 }"
                  class="cursor-pointer hover:text-blue-600">Completed</li>
              </ul>
            </div>
          </div>

          <VueDatePicker class="max-w-32" :range="{ partialRange: false }" :model-value="date"
            @update:model-value="handleDate"></VueDatePicker>
        </div>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TaskCardComponent @triggerEvent="fetchData()" :task="task" v-for="(task, index) in tasksStore.tasks"
        :key="index + 'card'" />
      <RouterLink to="/create">
        <div
          class="border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100 p-8 rounded-3xl flex items-center flex-col justify-center">
          <span class="font-semibold text-8xl text-slate-200">+</span>
          <span class="text-sm text-slate-300 mb-6">Create New Task</span>
        </div>
      </RouterLink>
    </div>
    <div class="pages flex mt-6 space-x-2">
      <button v-for="(pageNumber, index) in lastPage" :key="index + 'page'" @click="changePage(pageNumber)"
        :class="{ 'bg-slate-50': page == pageNumber, 'hover:bg-slate-50': page != pageNumber }"
        class="w-6 h-6 text-slate-500 border border-slate-200 text-sm flex items-center justify-center rounded-xl p-4">
        {{ pageNumber }}
      </button>
    </div>

    <div class="mt-8">
      <h1 class="text-2xl font-semibold">Analytics</h1>
      <Pie v-if="!loading" class="mt-4 mx-auto lg:ml-0 lg:mr-auto" :data="pieData" :options="pieOptions" />
    </div>
  </div>
</template>

<style>
.dp__pointer {
  @apply text-xs rounded-3xl;
}
</style>