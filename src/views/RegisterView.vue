<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-250px)] p-4">
    <div class="w-full max-w-md p-8 bg-white border border-gray-200 shadow-2xl md:p-10 rounded-xl">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-7">Buat Akun Baru</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-5">
          <label for="name" class="block mb-2 text-sm font-semibold text-gray-700">Nama:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-semibold text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div class="mb-7">
          <label for="password" class="block mb-2 text-sm font-semibold text-gray-700"
            >Password:</label
          >
          <div class="relative">
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              class="w-full px-4 py-2 pr-10 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle password visibility"
            >
              <svg
                v-if="passwordFieldType === 'password'"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7a1.8 1.8 0 0 1 .31-1.24"
                />
                <path
                  d="M6.61 6.61A13.526 13.526 0 0 1 12 4c7 0 10 7 10 7a1.8 1.8 0 0 1-.31 1.24"
                />
                <path d="M11.61 11.61a3 3 0 1 0-3.43-3.43" />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
        </div>
        <div
          v-if="authStatus === 'error' && authError"
          class="relative px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded"
          role="alert"
        >
          <span class="block sm:inline">{{ authError }}</span>
        </div>
        <div class="flex items-center justify-center">
          <button
            type="submit"
            :disabled="authStatus === 'loading'"
            class="w-full px-4 py-3 font-bold text-white transition-colors duration-200 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:shadow-outline disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {{ authStatus === 'loading' ? 'Sedang Mendaftar...' : 'Daftar' }}
          </button>
        </div>
        <p class="mt-6 text-sm text-center text-gray-600">
          Sudah punya akun?
          <router-link to="/login" class="font-medium text-blue-600 hover:underline"
            >Login di sini</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordFieldType: 'password', // New data property for password field type
    }
  },
  computed: {
    ...mapState('auth', ['authStatus']),
    ...mapGetters('auth', ['authError']),
  },
  methods: {
    ...mapActions('auth', ['register']),
    async submitForm() {
      try {
        await this.register({ name: this.name, email: this.email, password: this.password })
        this.$router.push('/')
      } catch {
        console.log('Registration attempt failed, error handled by store.')
      }
    },
    // New method to toggle password visibility
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    },
  },
}
</script>
