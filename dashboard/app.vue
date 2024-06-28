<template>
    <NuxtLayout v-if="$route.path !== '/login' && $route.path !== '/activate-account' && $route.path !== '/player' && $route.path !== '/send-email' && $route.path !== '/reset-password'"></NuxtLayout>
    <NuxtPage v-else></NuxtPage>
</template>
<style scoped>
*{
  background: #000000 !important;
}
</style>
