<template>
    <RouterView/>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
import {initFlowbite} from 'flowbite';
import {onMounted} from "vue";

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>