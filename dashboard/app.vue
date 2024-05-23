<template>
    <NuxtLayout v-if="$route.path !== '/login'"></NuxtLayout>
    <NuxtPage v-else></NuxtPage>
</template>
<style scoped>
*{
  background: #F2F6F6;
  font-family: "Battambang", system-ui;
}
</style>
