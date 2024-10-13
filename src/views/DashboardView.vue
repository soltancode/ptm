<script setup>
import TaskCardComponent from '@/components/TaskCardComponent.vue';
import DropdownIconComponent from '@/components/DropdownIconComponent.vue';
</script>

<template>
  <div>
    <div class="flex flex-col lg:flex-row items-center justify-between">
      <div class="flex justify-between w-full">
        <h1 class="text-2xl font-semibold">Tasks</h1>
        <button class="create-btn lg:hidden">Create Task</button>
      </div>
      <div class="flex w-full flex-col lg:flex-row lg:justify-end">
        <div
          class="space-x-2 w-fit flex items-center justify-start lg:justify-end mt-4 lg:mt-0 lg:border-r lg:border-r-slate-200 lg:pr-4 lg:mr-4">
          <span class="text-xs text-slate-500">Sort by:</span>
          <button class="text-nowrap border bg-slate-50 border-slate-200 rounded-3xl text-xs px-4 py-1 flex items-center">
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
      <TaskCardComponent />
      <TaskCardComponent />
      <TaskCardComponent />
      <TaskCardComponent />
      <TaskCardComponent />
      <div
        class="border border-slate-200 cursor-pointer bg-slate-50 hover:bg-slate-100 p-5 rounded-3xl flex items-center flex-col justify-center">
        <span class="font-semibold text-8xl text-slate-200">+</span>
        <span class="text-sm text-slate-300 mb-6">Create New Task</span>
      </div>
    </div>
  </div>
</template>