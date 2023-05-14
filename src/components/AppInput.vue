<template>
    <span>
        <label :for="inputInfo.name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ inputInfo.label }}</label>
        <input :type="inputInfo.type || inputInfo.name" :name="inputInfo.name" :id="inputInfo.name" :placeholder="inputInfo.placeholder" required
               autocomplete="on" :value="inputInfo.value" @input="onInput" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </span>
</template>

<script lang="ts" setup>

    interface userInfo{
        label: string,
        name: string,
        type?: string,
        placeholder: string,
        value: string,

    }
    const props = defineProps<{
        inputInfo: userInfo,
    }>()
    const emit = defineEmits(['onInput']);
    const onInput = (e: Event) => {
        emit("onInput",(e.target as HTMLInputElement).value )
    }
</script>