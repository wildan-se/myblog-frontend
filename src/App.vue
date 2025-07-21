<template>
  <div id="app" class="flex flex-col min-h-screen font-sans antialiased text-gray-900 bg-gray-100">
    <header class="fixed top-0 left-0 z-50 w-full py-4 bg-white border-b border-gray-200 shadow-md">
      <nav class="container flex items-center justify-between px-8 mx-auto">
        <!-- Logo Section -->
        <div class="flex items-center space-x-2">
          <!-- Wrapper untuk logo dan teks -->
          <img
            src="/logo-blog.png"
            alt="MyBlog Logo"
            class="object-cover w-8 h-8 rounded-full bg-slate-950 sm:h-10 sm:w-10 animate-logo-pop-image"
          />
          <router-link
            to="/"
            class="text-xl text-indigo-700 transition-all duration-300 ease-in-out text hover:text-indigo-800 lg:text-3xl"
          >
            MyBlog
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="items-center hidden space-x-4 md:flex lg:space-x-6">
          <router-link
            to="/"
            class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
            >Home</router-link
          >
          <router-link
            to="/about"
            class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
            >About</router-link
          >

          <template v-if="isAuthenticated">
            <router-link
              v-if="isAdmin"
              to="/admin"
              class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
              >Admin Panel</router-link
            >
            <button
              @click="handleLogout"
              class="px-5 py-2 font-semibold text-white transition-colors duration-200 bg-red-600 rounded-lg shadow-md hover:bg-red-700"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              class="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-700"
              >Login</router-link
            >
            <router-link
              to="/register"
              class="px-5 py-2 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
              >Register</router-link
            >
          </template>
        </div>

        <!-- Mobile Hamburger Icon -->
        <div class="flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle navigation"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
          >
            <svg
              v-if="!isMobileMenuOpen"
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <svg
              v-else
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile Menu Overlay -->
    <transition name="slide-fade">
      <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-8 bg-white shadow-lg h-1/3 md:hidden"
      >
        <button
          @click="toggleMobileMenu"
          class="absolute text-gray-700 rounded-md top-4 right-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Close navigation"
        >
          <svg
            class="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <router-link
          to="/"
          @click="closeMobileMenu"
          class="text-3xl font-bold text-gray-800 transition-colors duration-200 hover:text-indigo-700"
          >Home</router-link
        >
        <router-link
          to="/about"
          @click="closeMobileMenu"
          class="text-3xl font-bold text-gray-800 transition-colors duration-200 hover:text-indigo-700"
          >About</router-link
        >

        <template v-if="isAuthenticated">
          <router-link
            v-if="isAdmin"
            to="/admin"
            @click="closeMobileMenu"
            class="text-3xl font-bold text-gray-800 transition-colors duration-200 hover:text-indigo-700"
            >Admin Panel</router-link
          >
          <button
            @click="handleLogoutAndCloseMenu"
            class="px-8 py-4 text-xl font-bold text-white transition-colors duration-200 bg-red-600 rounded-lg shadow-md hover:bg-red-700"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <router-link
            to="/login"
            @click="closeMobileMenu"
            class="text-3xl font-bold text-gray-800 transition-colors duration-200 hover:text-indigo-700"
            >Login</router-link
          >
          <router-link
            to="/register"
            @click="closeMobileMenu"
            class="px-8 py-4 text-xl font-bold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
            >Register</router-link
          >
        </template>
      </div>
    </transition>

    <main class="container flex-grow px-4 py-10 mx-auto mt-16">
      <router-view />
    </main>

    <footer class="py-6 text-center text-white bg-gray-900 shadow-inner">
      <p class="text-sm">&copy; {{ new Date().getFullYear() }} MyMEVNBlog. All rights reserved.</p>
      <div class="flex justify-center mt-2 space-x-4 text-gray-400">
        <a href="#" class="hover:text-indigo-500">Privacy Policy</a>
        <a href="#" class="hover:text-indigo-500">Terms of Service</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      isMobileMenuOpen: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'isAdmin']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout() {
      console.log('Attempting desktop logout...')
      this.logout()
      this.$router.push({ name: 'login' })
    },
    handleLogoutAndCloseMenu() {
      console.log('Attempting mobile logout...')
      this.logout()
      this.closeMobileMenu()
      this.$router.push({ name: 'login' })
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
      document.body.style.overflow = ''
    },
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    },
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

/* General styles for consistent look */
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #2d3748;
}
a {
  color: #4c51bf;
}
button {
  background-color: #4c51bf;
}

/* Custom CSS for Text Gradient Logo */
.blog-logo-gradient {
  background-image: linear-gradient(to right, #00bcd4, #8e24aa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  filter: brightness(1);
  text-shadow: none;
}

.blog-logo-gradient:hover {
  filter: brightness(1.2);
  transform: scale(1.02);
  text-shadow: 0 0 8px rgba(142, 36, 170, 0.6);
}

/* Animation for logo pop on load */
@keyframes logoPop {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  80% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-logo-pop {
  animation: logoPop 0.7s ease-out forwards;
}

/* Animation for logo image pop on load */
@keyframes logoPopImage {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  80% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-logo-pop-image {
  animation: logoPopImage 0.7s ease-out forwards;
  animation-delay: 0.1s; /* Slightly delayed from text pop */
}

/* Mobile Menu Slide Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
