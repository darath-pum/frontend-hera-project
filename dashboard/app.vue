<template>
    <NuxtLayout v-if="$route.path !== '/login'"></NuxtLayout>
    <NuxtPage v-else></NuxtPage>
</template>
<style scoped>
*{
  background: #000000 !important;
}
</style>
