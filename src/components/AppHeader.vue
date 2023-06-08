<template>
    <header class="w-full  bg-slate-50 shadow-md flex fixed top-0 mx-auto z-10">
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 w-full">
            <div class="flex flex-wrap justify-between items-center mx-auto">
                <a href="/" class="flex items-center"  v-if="routerName !== 'sheet-page'">
                    <img src="@/assets/logo.png" class="mr-3 h-6 sm:h-10 rounded-lg"
                         alt="Open Editor Logo"/>
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Open Editor</span>
                </a>
                <div v-else class="flex items-center">
                    <a href="/">
                        <img src="@/assets/logo.png" class="mr-3 h-6 sm:h-10 rounded-lg"
                             alt="Open Editor Logo"/>
                    </a>
                    <span ref="title_span" @dblclick="changeTableName" id="table_name-span" class="self-center text-xl font-normal dark:text-white w-max max-w-[275px] min-w-[275px] text-ellipsis whitespace-nowrap overflow-hidden">{{ tableTitle }}</span>
                    <input ref="title_input" placeholder="Untitled" type="text" name="title" id="table_name-input" @keyup.enter="submitChange" class="hidden w-[275px] p-0 border-none text-xl" v-model.trim="tableTitle">
                </div>
                <div class="flex items-center lg:order-2">
                    <button type="button"
                            class="flex mx-3 text-2xl px-1 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
                        <span class="sr-only">Open user menu</span>
                        🙂
                    </button>
                    <!-- Dropdown menu -->
                    <div class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                         id="dropdown">
                        <div class="py-3 px-4">
                            <span class="block text-sm font-semibold text-gray-900 dark:text-white">Unnamed</span>
                            <span
                                class="block text-sm font-light text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                        </div>
                        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                            <li>
                                <a href="#"
                                   class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                                    profile</a>
                            </li>
                            <li>
                                <a href="#"
                                   class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account
                                    settings</a>
                            </li>
                        </ul>
                        <ul class="py-1 font-light text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                            <li>
                                <RouterLink to="/"
                                            class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Log
                                    out</RouterLink>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="mobile-menu-2" type="button"
                            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clip-rule="evenodd"></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center">
                        <li>
                            <a href="#" @click="toggleClass"
                                        class="block py-2 pr-4 pl-3 text-primary-600 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 pointer-events-none" aria-current="page">Sheets</a>
                        </li>
                        <li >
                            <a href="#" @click="toggleClass"
                               class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Docs</a>
                        </li>
                        <li>
                            <a href="#" @click="toggleClass"
                               class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Slides</a>
                        </li>
                        <li>
                            <a href="#" @click="toggleClass"
                               class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Drawing</a>
                        </li>
                        <li class="-order-1 lg:order-none">
                            <div class="w-72">
                                <form class="flex items-center">
                                    <label for="simple-search" class="sr-only">Search</label>
                                    <div class="relative w-full">
                                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                 fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                      clip-rule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="text" id="simple-search"
                                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                               placeholder="Search" required>
                                    </div>
                                </form>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <RouterView />
</template>

<script lang="ts" setup>
import { RouterLink, RouterView, useRouter} from "vue-router";
import {nextTick, onMounted, type Ref, ref} from "vue";
import {initFlowbite} from "flowbite";
import sheets from "@/data";

onMounted(() => {
    initFlowbite();
})

const router = useRouter();
const routerName = router.currentRoute.value.name
const routerParamsId = Number(router.currentRoute.value.params.id)

const toggleClass = (e:Event) => {
    const textPrimary = (e.target as HTMLElement).parentElement?.parentElement?.querySelector('.text-primary-600');
    if (textPrimary) {
        textPrimary.classList.remove('text-primary-600', 'pointer-events-none');
    }
    (e.target as HTMLElement).classList.add('text-primary-600','pointer-events-none')
}
const tableTitle:Ref<string> = ref(sheets.value[routerParamsId].name);
const title_span: Ref<HTMLSpanElement|null> = ref(null)
const title_input: Ref<HTMLInputElement|null> = ref(null)
const changeTableName = async () =>{
    title_span.value!.classList.add('hidden');
    title_input.value!.classList.remove('hidden');
    await nextTick();
    title_input.value!.focus();
}

const submitChange = () => {
    tableTitle.value.trim() === "" ? tableTitle.value = "Untitled" :
    sheets.value[routerParamsId].name = tableTitle.value;
    title_input.value!.classList.add('hidden');
    title_span.value!.classList.remove('hidden')
}
</script>
