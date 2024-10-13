<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router'
import LogoComponent from './LogoComponent.vue';
import DropdownIconComponent from './DropdownIconComponent.vue';

const profileMenu = ref(false);
const dropdown = ref(null);

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
                    <DropdownIconComponent class="w-5" />
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