<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router'
import LogoComponent from './LogoComponent.vue';

const profileMenu = ref(false);
const dropdown = ref(null)

const handleClickOutside = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        profileMenu.value = false;
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
    <header class="flex items-center p-4">
        <LogoComponent />
        <nav class="ml-auto space-x-5 text-sm flex flex-col lg:flex-row items-end lg:items-center space-y-px">
            <div class="relative cursor-pointer" ref="dropdown">
                <span @click="profileMenu = !profileMenu" class="text-slate-400 font-light flex">
                    Hi,&nbsp;<span class="text-slate-800 font-medium">Soltan!</span>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                            class=" fill-slate-500" />
                    </svg>
                </span>

                <div v-if="profileMenu"
                    class="border border-slate-100 w-24 text-center bg-white rounded-xl text-sm p-2 absolute top-6 right-0">
                    <RouterLink class="hover:text-blue-700 font-light text-slate-700 cursor-pointer" to="/login">
                        Log out
                    </RouterLink>
                </div>
            </div>

            <button class="create-btn hidden lg:block">Create</button>
        </nav>
    </header>
</template>