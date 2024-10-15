<script setup>
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

defineProps({
  task: {
    type: Object,
    required: true
  },
});

const open = ref(false);
const dropdown = ref(null);

const handleClickOutside = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        open.value = false;
    }
}

onMounted(() => {
    window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
    <div class="border border-slate-100 bg-slate-50/20 p-5 rounded-3xl flex flex-col justify-between">
        <div>
            <div class="flex items-start justify-between relative">
                <div>
                    <span class="text-slate-400 font-extralight text-xs block">{{ task.due_date }}</span>
                    <span class="font-semibold text-base mt-1 block text-slate-700">{{ task.title }}</span>
                </div>
                <div ref="dropdown">
                    <span @click="open = !open" class="text-sm font-medium text-slate-500 cursor-pointer block">...</span>
                    <div v-if="open" class="border border-slate-100 bg-white rounded-xl text-xs p-2 absolute top-5 right-0">
                        <ul class="space-y-1">
                            <li class="cursor-pointer hover:text-blue-600">Edit Task</li>
                            <li class="cursor-pointer hover:text-blue-600">Delete</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p class="text-xs text-slate-500 mt-2 font-light">
                {{ task.description }}
            </p>
        </div>

        <div class="text-xs flex justify-between  mt-8">
            <div class="flex items-center space-x-1.5">
                <div v-if="task.status == 0" class="w-2 h-2 bg-slate-600 rounded-xl"></div>
                <div v-else-if="task.status == 1" class="w-2 h-2 bg-yellow-400 rounded-xl"></div>
                <div v-else-if="task.status == 2" class="w-2 h-2 bg-green-600 rounded-xl"></div>
                <span v-if="task.status == 0" class="text-slate-800 font-medium">To Do</span>
                <span v-else-if="task.status == 1" class="text-slate-800 font-medium">In Progress</span>
                <span v-else-if="task.status == 2" class="text-slate-800 font-medium">Completed</span>
            </div>
            <span v-if="task.status != 2" class="text-slate-500 font-light cursor-pointer hover:text-blue-600">
                Mark as completed
            </span>
        </div>
    </div>
</template>