<template>
    <header class="w-full  bg-slate-50 shadow-md flex px-8 py-2 fixed z-10 mx-auto dark:bg-gray-800 ">
        <img alt="Vue logo" class="logo block" src="@/assets/logo.svg" width="60" height="60"/>

        <div class="wrapper w-full flex items-center justify-between px-8">
            <div class="project-name">
                <h1 class="green font-medium text-4xl"> Open Editor</h1>
                <!--        <h3 class="text-lg">Document editor with real-time collaboration capabilities</h3>-->
            </div>
            <nav class="ml-auto flex items-center">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/log-in" v-if="!isLogin">Login</RouterLink>
                <div class="btn-signup ml-1" v-if="!isLogin">
                    <RouterLink to="/sign-up"
                                class="text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        Sign up
                    </RouterLink>
                </div>
                <div class="user-icon cursor-pointer mx-1.5" v-if="isLogin">
                    <img src="@/assets/user-icon-21.jpeg" alt="user" class="w-9 h-9 rounded-full">
                </div>
            </nav>
            <div class="buttons flex">
                <div class="btn-login">
                </div>

            </div>
        </div>
    </header>

    <RouterView />
</template>

<script lang="ts" setup>
import {RouterLink, RouterView} from "vue-router";
const isLogin = true;
</script>

<style scoped lang="scss">
nav > a{
  @apply py-2 px-4 lg:px-5 lg:py-2.5 duration-300;
  &:hover{
    @apply bg-gray-100 dark:bg-slate-700 rounded-md;
  }
}
</style>