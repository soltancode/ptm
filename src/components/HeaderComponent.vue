<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'
import LogoComponent from './LogoComponent.vue';
import DropdownIconComponent from './DropdownIconComponent.vue';
import { useAuthStore } from '@/stores/auth';

const loading = ref(false);
const router = useRouter();
const profileMenu = ref(false);
const dropdown = ref(null);
const authStore = useAuthStore();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const handleClickOutside = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        profileMenu.value = false;
    }
}

const logout = async () => {
    loading.value = true;
    
    const response = await fetch(`${apiBaseUrl}/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authStore.getToken
        }
    });

    loading.value = false;

    if (response.status == 200) {
        authStore.clearToken()
        router.push('/login');
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
        <div v-if="loading" class="overlay z-20">
            <div class="overlay__inner">
                <div class="overlay__content"><span class="spinner"></span></div>
            </div>
        </div>
        <LogoComponent />
        <nav class="ml-auto space-x-5 text-sm flex flex-col lg:flex-row items-end lg:items-center space-y-px">
            <div class="relative cursor-pointer" ref="dropdown">
                <span @click="profileMenu = !profileMenu" class="text-slate-400 font-light flex">
                    Hi,&nbsp;<span class="text-slate-800 font-medium">{{ authStore.getUsername }}!</span>
                    <DropdownIconComponent class="w-5" />
                </span>

                <div v-if="profileMenu"
                    class="border border-slate-100 w-24 text-center bg-white rounded-xl text-sm p-2 absolute top-6 right-0">
                    <button @click="logout()" class="hover:text-blue-700 font-light text-slate-700 cursor-pointer">
                        Log out
                    </button>
                </div>
            </div>

            <button class="create-btn hidden lg:block">Create</button>
        </nav>
    </header>
</template>