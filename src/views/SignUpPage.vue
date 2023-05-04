<template>
    <section
        class="bg-[url('https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
                <img src="@/assets/logo.png" alt="Open Editor" class="mr-3 h-6 sm:h-10 rounded-lg">
                Open Editor
            </a>
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                <div class="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
                    <h2
                        class="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                        Create your Free Account
                    </h2>
                    <form class="space-y-4 md:space-y-6" action="/home-page">
                        <app-input v-for="(inp,i) in inputInfo" :key="i" :inputInfo="inputInfo[i]" @onInput="onInput(i, $event)" class="block"/>
                        <div>
                            <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birth Date</p>
                            <div class="flex items-center">
                                <div class="w-full mr-4">
                                    <label for="day" class="sr-only">Day</label>
                                    <select id="day" name="day" required
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="" disabled selected>Day</option>
                                        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
                                    </select>
                                </div>
                                <div class="w-full mr-4">
                                    <label for="month" class="sr-only">Month</label>
                                    <select id="month"  required  name="month"  v-model="birthMonthSelected"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="" selected>Month</option>
                                        <option v-for="(month,i) in nameMonth" :key="i" :value="i">{{ month }}</option>
                                    </select>
                                </div>
                                <div class="w-full">
                                    <label for="year" class="sr-only">Year</label>
                                    <select id="year" name="year" required v-model="birthYearSelected"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option disabled value="" selected>Year</option>
                                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="newsletter" aria-describedby="newsletter" type="checkbox"
                                       class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                >
                            </div>
                            <div class="ml-3 text-sm">
                                <label for="newsletter" class="font-light text-gray-500 dark:text-gray-300">I accept the
                                    <a class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                       href="#">Terms and Conditions</a></label>
                            </div>
                        </div>
                        <button type="submit"
                                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Create an account
                        </button>
<!--                        <RouterLink to="/home-page" custom v-slot="{navigate}">-->
<!--                            <button type="submit"-->
<!--                                    @click="navigate"-->
<!--                                    :disabled="!valid"-->
<!--                                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">-->
<!--                                Create-->
<!--                                an account-->
<!--                            </button>-->
<!--                        </RouterLink>-->
                        <p class="text-sm font-light text-center text-gray-500 dark:text-gray-300">
                            <RouterLink to="/"
                               class="font-medium text-primary-600 hover:underline dark:text-primary-500">Already have
                                an account?</RouterLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {computed, ref} from "vue";
import {RouterLink} from "vue-router";
import AppInput from "@/components/AppInput.vue";

interface inpInfo {
    label: string,
    name: string,
    type?: string,
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
    {
        label: 'Confirm password',
        type:'password',
        name: 'conf-password',
        placeholder: '••••••••',
        value: '',
        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-.\\/:;<=>?\\@[\]^_`{|}~]).{7,64}$/
    },
]);
const onInput = (i: number, value: string) => {
    inputInfo.value[i].value = value
    valid.value = (inputInfo.value[0].pattern.test(inputInfo.value[0].value) && inputInfo.value[1].pattern.test(inputInfo.value[1].value));
}
const yearNow = new Date().getFullYear();
const daysMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
const nameMonth = ["January","February","March","April","May","June","July", "August","September","October","November","December"]
let birthYearSelected = ref(''),
    birthMonthSelected = ref('');
let years = Array.from(Array(100)).map((_,index)=>yearNow-6-index)

const days = computed(()=>{
    console.log(birthMonthSelected.value)
    if (birthMonthSelected.value == 1 && birthYearSelected.value % 4 == 0){
        return 29
    }
    if (daysMonth[birthMonthSelected.value]){
        return daysMonth[birthMonthSelected.value]
    } return 31
})
</script>
