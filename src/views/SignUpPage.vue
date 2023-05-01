<template>
    <section class="bg-gray-50 dark:bg-gray-900 bg-[url('/images/bg.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <!---->
<!--                        <div>-->
<!--                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>-->
<!--                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>-->
<!--                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>-->
<!--                        </div>-->
<!--                        <div class="flex items-center justify-between">-->
<!--                            <div class="flex items-start">-->
<!--                                <div class="flex items-center h-5">-->
<!--                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">-->
                        <!---->

                        <oe-input v-for="(inp,i) in inputInfo" :key="i" :inputInfo="inputInfo[i]" @onInput="onInput(i, $event)"/>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800">

                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                        </div>
                        <RouterLink to="/home-page" v-slot="{navigate}" custom>
                            <button type="submit"
                                    @click="navigate"
                                    :disabled="!valid"
                                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Sign up
                            </button>
                        </RouterLink>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            If you already have an account, just <RouterLink to="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</RouterLink>.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {ref} from "vue";
import {RouterLink} from "vue-router";
import OeInput from "@/components/AppInput.vue";

interface inpInfo {
    label: string,
    name: string,
    placeholder: string,
    value: string,
    pattern: RegExp
}
let valid = ref(false);

const inputInfo: Ref<inpInfo[]> = ref([
    {
        label: 'Your email',
        name: 'email',
        placeholder: 'name@company.com',
        value: '',
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    },
    {
        label: 'Password',
        name: 'password',
        placeholder: '••••••••',
        value: '',
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\\/:;<=>?\\@[\]^_`{|}~]).{7,64}$/
    },
]);
const onInput = (i: number, value: string) => {
    inputInfo.value[i].value = value
    let inputValue
    valid.value = !!(inputInfo.value[0].pattern.test(inputInfo.value[0].value) && inputInfo.value[1].pattern.test(inputInfo.value[1].value));
}
</script>
