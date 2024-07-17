<template>
  <section class="bg-gray-50 dark:bg-gray-900 max-w-sm mx-auto">
    <div class="py-8 px-4 m max-w-screen-xl">
      <div>
        <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Login
          </h2>
          <form @submit.prevent="login" class="mt-8 space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input v-model="email" type="email" name="email" id="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" required/>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     required/>
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white text-center">
              <button type="submit"
                      class="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {useRouter} from "vue-router";
import {AuthService} from "../Services/AuthService";


export default defineComponent({
  name: "Login",
  setup() {
    const router = useRouter();
    return {router};
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const authService = new AuthService(this.$axios);

      const response = await authService.login(this.email, this.password);

      if (!response.success) {
        alert(JSON.stringify(response.data));
      }
      await this.router.push({name: 'home'});
    }
  }
});
</script>

<style scoped>

</style>