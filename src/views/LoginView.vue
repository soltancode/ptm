<script setup>
</script>

<template>
  <div class="flex flex-col items-center">
    <div>
      <div class="flex flex-col mt-16 lg:mt-20">
        <img src="@/assets/azericard.svg" alt="Azericard" class="w-44">
        <span class="text-sm text-blue-900">Personal Task Management</span>
      </div>

      <form class="mt-8 flex flex-col w-80">
        <h3 class="font-extrabold text-2xl text-slate-700">Sign In</h3>
        <span class="text-slate-600 text-sm mt-1 mb-2">Don't have an account? <a href="" class="text-blue-700 hover:text-blue-800 hover:underline">Sign up</a></span>
        <input class="my-2 bg-slate-50 py-2.5 px-10 rounded-3xl text-sm border border-slate-300" type="text" name="email" placeholder="E-mail">
        <input class="my-2 bg-slate-50 py-2.5 px-10 rounded-3xl text-sm border border-slate-300" type="password" name="password" placeholder="Password">
        <button class="bg-blue-600 hover:bg-blue-700 text-white text-sm mt-3 py-2.5 px-6 rounded-3xl ">Sign In</button>
      </form>
    </div>
  </div>
</template>