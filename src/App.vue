<script setup lang="ts">
import Header from "./Application/Components/Header.vue";
import Footer from "./Application/Components/Footer.vue";
</script>

<template>
  <div class="relative py-8">

    <div class="container relative mx-auto bg-white shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5">

      <Header></Header>

      <main>
        <router-view />
      </main>

      <Footer></Footer>
    </div>
  </div>
</template>

