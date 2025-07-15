<template>
  <div class="relative min-h-screen overflow-hidden about-page">
    <!-- Global Background Gradient with subtle animation -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 animate-background-pan"
    ></div>

    <div class="relative z-10 px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <div
        class="py-16 mb-16 text-white shadow-2xl md:py-24 lg:py-32 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-3xl animate-fade-in-scale-up"
      >
        <!-- Decorative background elements (animated blobs/shapes) -->
        <div class="absolute inset-0 opacity-20">
          <svg
            class="w-full h-full"
            viewBox="0 0 1440 320"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="rgba(255, 255, 255, 0.1)"
              fill-opacity="1"
              d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,128C672,128,768,192,864,186.7C960,181,1056,107,1152,90.7C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              class="animate-wave-slow"
            ></path>
            <path
              fill="rgba(255, 255, 255, 0.05)"
              fill-opacity="1"
              d="M0,128L48,128C96,128,192,128,288,138.7C384,149,480,171,576,170.7C672,171,768,149,864,128C960,107,1056,85,1152,96C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              class="animate-wave-fast"
            ></path>
          </svg>
        </div>

        <div class="relative z-10 max-w-4xl px-4 mx-auto text-center">
          <!-- Added px-4 for inner padding -->
          <h1
            class="mb-6 text-4xl font-extrabold leading-tight tracking-tight lg:p-4 sm:text-5xl lg:text-7xl animate-clip-reveal"
          >
            Tentang <span class="text-yellow-300 drop-shadow-lg">MyMEVNBlog</span>
          </h1>
          <p
            class="max-w-3xl mx-auto mb-4 text-lg leading-relaxed sm:text-xl opacity-90 animate-fade-in-up-stagger-1"
          >
            <!-- Adjusted mb-4 -->
            Platform komprehensif untuk menguasai pengembangan web
            <span class="font-bold">fullstack</span> dengan
            <span class="font-bold">MEVN Stack</span>.
          </p>
          <p
            class="max-w-3xl mx-auto text-lg leading-relaxed sm:text-xl opacity-90 animate-fade-in-up-stagger-2"
          >
            Belajar, bereksperimen, dan bangun aplikasi modern dari awal hingga akhir.
          </p>
        </div>
      </div>

      <!-- Main Content Section -->
      <div
        class="p-8 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 md:p-12 rounded-2xl animate-fade-in-up-stagger-3"
      >
        <p class="mb-8 text-xl leading-relaxed text-center text-gray-700 dark:text-gray-300">
          Tujuan utama kami adalah mendemonstrasikan integrasi
          <span class="font-semibold text-indigo-700 dark:text-indigo-400"
            >backend API RESTful</span
          >
          yang kuat dengan
          <span class="font-semibold text-indigo-700 dark:text-indigo-400"
            >frontend yang dinamis</span
          >, menggunakan pola arsitektur terbaik dan praktik pengembangan yang efisien.
        </p>

        <h2
          class="pb-4 mt-12 mb-8 text-3xl font-bold text-center text-gray-800 border-b-2 border-indigo-200 sm:text-4xl dark:text-gray-100 dark:border-indigo-700 animate-fade-in-up-stagger-4"
        >
          Teknologi di Balik Layar
        </h2>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <!-- MongoDB Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0s"
          >
            <div class="mb-4 text-5xl text-center text-green-600 dark:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-database"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 12a9 3 0 0 0 18 0" />
                <path d="M3 19a9 3 0 0 0 18 0" />
                <path d="M12 5v14" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              MongoDB
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Database NoSQL berbasis dokumen yang fleksibel dan skalabel untuk menyimpan semua data
              blog seperti postingan, kategori, dan pengguna.
            </p>
          </div>

          <!-- Express.js Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.1s"
          >
            <div class="mb-4 text-5xl text-center text-indigo-600 dark:text-indigo-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-server"
              >
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                <line x1="6" x2="6.01" y1="6" y2="6" />
                <line x1="6" x2="6.01" y1="18" y2="18" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Express.js
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Framework web minimalis namun kuat untuk Node.js yang memfasilitasi pembuatan API
              backend RESTful, menangani rute, dan middleware.
            </p>
          </div>

          <!-- Vue.js Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.2s"
          >
            <div class="mb-4 text-5xl text-center text-emerald-600 dark:text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-leaf"
              >
                <path
                  d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.5 2 6.5A8 8 0 0 1 7 19.9l-1 0.1c-1 0-1 1-2 1s-2 0-3-1c-.7-.6-1.5-1.4-1.4-2.5C.8 10.3 1.5 9 3 8.5c1.5-.5 4-.4 5 .6c1.5 1.5 2 1.4 4.5 2.4A7 7 0 0 0 11 20z"
                />
                <path d="M9.8 17.5c-1-.8-2.3-1.2-3.7-1.4c1.4.2 2.7.6 3.7 1.4z" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Vue.js
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Framework JavaScript progresif dan reaktif untuk membangun antarmuka pengguna yang
              menarik dan interaktif di sisi frontend.
            </p>
          </div>

          <!-- Node.js Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.3s"
          >
            <div class="mb-4 text-5xl text-center text-lime-600 dark:text-lime-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-box"
              >
                <path
                  d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Node.js
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Runtime JavaScript sisi server yang memungkinkan eksekusi kode JavaScript di luar
              browser, menjadi fondasi untuk backend aplikasi.
            </p>
          </div>

          <!-- Vuex Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.4s"
          >
            <div class="mb-4 text-5xl text-center text-purple-600 dark:text-purple-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-boxes"
              >
                <path
                  d="M2.97 12.93A2 2 0 0 0 2 14v2a2 2 0 0 0 .97 1.07l7 3.5a2 2 0 0 0 2.06 0l7-3.5A2 2 0 0 0 22 16v-2a2 2 0 0 0-.97-1.07l-7-3.5a2 2 0 0 0-2.06 0z"
                />
                <path
                  d="M2.97 7.93A2 2 0 0 0 2 9v2a2 2 0 0 0 .97 1.07l7 3.5a2 2 0 0 0 2.06 0l7-3.5A2 2 0 0 0 22 11V9a2 2 0 0 0-.97-1.07l-7-3.5a2 2 0 0 0-2.06 0z"
                />
                <path d="M7 2v2" />
                <path d="M17 2v2" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Vuex
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Untuk manajemen state terpusat di aplikasi frontend Vue.js, memungkinkan berbagi data
              antar komponen dengan mudah dan konsisten.
            </p>
          </div>

          <!-- Vue Router Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.5s"
          >
            <div class="mb-4 text-5xl text-center text-red-600 dark:text-red-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-route"
              >
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7H11l-3.4-7H6" />
                <circle cx="18" cy="5" r="3" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Vue Router
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Mengelola navigasi antar halaman (routing) di aplikasi single-page Vue.js, menciptakan
              pengalaman pengguna yang mulus tanpa refresh halaman penuh.
            </p>
          </div>

          <!-- Tailwind CSS Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.6s"
          >
            <div class="mb-4 text-5xl text-center text-sky-600 dark:text-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-paint-bucket"
              >
                <path
                  d="M19 11h-1.5a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 0 .5.5H22"
                />
                <path d="M2 10h10" />
                <path d="M12 2a8 8 0 0 1 8 8v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a8 8 0 0 1 8-8Z" />
                <path d="M7 10v.01" />
                <path d="M12 10v.01" />
                <path d="M17 10v.01" />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              Tailwind CSS
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Framework CSS berbasis utilitas yang sangat fleksibel dan cepat untuk mendesain UI
              yang modern dan responsif dengan kelas-kelas CSS yang dapat dikomposisikan.
            </p>
          </div>

          <!-- JWT Card -->
          <div
            class="p-6 transition-shadow duration-300 transform shadow-md tech-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg hover:-translate-y-1 animate-card-pop-in"
            style="animation-delay: 0.7s"
          >
            <div class="mb-4 text-5xl text-center text-yellow-600 dark:text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto lucide lucide-key"
              >
                <path d="m2 12 10.5-10.5a2.12 2.12 0 0 1 3 3L5 15.5" />
                <path
                  d="M17.64 15.12a3 3 0 0 0 3.75 3.75L22 22l-4.75-1.19a3 3 0 0 0-3.75-3.75L2 12Z"
                />
              </svg>
            </div>
            <h3 class="mb-3 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              JWT
            </h3>
            <p class="leading-relaxed text-gray-700 dark:text-gray-300">
              Mekanisme keamanan berbasis token untuk otentikasi dan otorisasi pengguna, memastikan
              akses aman ke endpoint API yang dilindungi.
            </p>
          </div>
        </div>

        <!-- Call to Action Section -->
        <div
          class="p-8 mt-16 text-center shadow-inner bg-indigo-50 dark:bg-indigo-900 rounded-xl animate-fade-in-up-stagger-5"
        >
          <p class="mb-6 text-xl font-medium text-gray-800 dark:text-gray-100">
            Tertarik untuk berkolaborasi atau memiliki pertanyaan?
          </p>
          <a
            href="mailto:your.email@example.com"
            class="relative z-10 inline-flex items-center px-8 py-4 overflow-hidden text-lg font-bold text-white transition-all duration-300 ease-in-out transform rounded-full shadow-lg group hover:scale-105 hover:shadow-xl neon-button"
          >
            <!-- Content wrapper to ensure text/icon is above any pseudo-elements -->
            <span class="relative z-10 flex items-center text-sm lg:text-lg text-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-3 transition-transform duration-300 lucide lucide-mail group-hover:translate-x-1 group-hover:rotate-6"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Hubungi Kami
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
/* Custom Animations */
@keyframes fadeInScaleUp {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes clipReveal {
  0% {
    clip-path: inset(0 100% 0 0);
  }
  100% {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes fadeInUpDelay {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardPopIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Hero background wave animations (from HomeView) */
@keyframes waveSlow {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes waveFast {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Global Background Animation (from HomeView) */
@keyframes backgroundPan {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* NEW: Neon Glow Keyframes */
@keyframes neonGlow {
  0% {
    box-shadow:
      0 0 5px rgba(129, 140, 248, 0.5),
      /* indigo-300 */ 0 0 10px rgba(129, 140, 248, 0.4),
      0 0 20px rgba(129, 140, 248, 0.3);
  }
  50% {
    box-shadow:
      0 0 10px rgba(129, 140, 248, 0.8),
      0 0 20px rgba(129, 140, 248, 0.6),
      0 0 30px rgba(129, 140, 248, 0.5),
      0 0 40px rgba(129, 140, 248, 0.4);
  }
  100% {
    box-shadow:
      0 0 5px rgba(129, 140, 248, 0.5),
      0 0 10px rgba(129, 140, 248, 0.4),
      0 0 20px rgba(129, 140, 248, 0.3);
  }
}

/* Apply animations */
.animate-fade-in-scale-up {
  animation: fadeInScaleUp 1s ease-out forwards;
}
.animate-clip-reveal {
  animation: clipReveal 1.5s ease-out forwards;
  animation-delay: 0.5s;
} /* Adjust delay */
.animate-fade-in-up-stagger-1 {
  animation: fadeInUpDelay 1s ease-out forwards;
  animation-delay: 0.8s;
}
.animate-fade-in-up-stagger-2 {
  animation: fadeInUpDelay 1s ease-out forwards;
  animation-delay: 1.1s;
}
.animate-fade-in-up-stagger-3 {
  animation: fadeInUpDelay 1s ease-out forwards;
  animation-delay: 1.4s;
} /* For main content block */
.animate-fade-in-up-stagger-4 {
  animation: fadeInUpDelay 1s ease-out forwards;
  animation-delay: 1.7s;
} /* For "Teknologi" title */
.animate-fade-in-up-stagger-5 {
  animation: fadeInUpDelay 1s ease-out forwards;
  animation-delay: 2.5s;
} /* For CTA section */
.animate-card-pop-in {
  animation: cardPopIn 0.7s ease-out forwards;
} /* Delay handled by inline style */
.animate-background-pan {
  background-size: 200% 200%; /* Make gradient larger than viewport */
  animation: backgroundPan 30s ease infinite alternate;
}

/* NEW: Neon Button Styling */
.neon-button {
  background-color: #4f46e5; /* indigo-600 */
  transition:
    background-color 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0); /* Initial transparent shadow */
}

.neon-button:hover {
  background-color: #6366f1; /* indigo-500 or brighter on hover */
  animation: neonGlow 1.5s ease-in-out infinite alternate; /* Apply neon glow animation on hover */
}

/* Dark mode considerations (optional, if you implement dark mode toggle) */
.dark .bg-gradient-to-br.from-gray-50 {
  --tw-gradient-from: #1a202c; /* Darker gray for dark mode background */
  --tw-gradient-to: #2d3748;
}
.dark .bg-gray-50 {
  background-color: #1a202c;
} /* dark:bg-gray-900 */
.dark .text-gray-800 {
  color: #edf2f7;
} /* dark:text-gray-100 */
.dark .bg-white {
  background-color: #2d3748;
} /* dark:bg-gray-800 */
.dark .border-gray-200 {
  border-color: #4a5568;
} /* dark:border-gray-700 */
.dark .text-gray-700 {
  color: #a0aec0;
} /* dark:text-gray-300 */
.dark .text-gray-600 {
  color: #a0aec0;
} /* dark:text-gray-400 */
.dark .bg-gray-200 {
  background-color: #4a5568;
} /* dark:bg-gray-700 */
.dark .text-indigo-700 {
  color: #9f7aea;
} /* dark:text-indigo-400 */
.dark .text-indigo-800 {
  color: #b794f4;
} /* dark:text-indigo-300 */
.dark .bg-indigo-100 {
  background-color: #553c9a;
} /* dark:bg-indigo-700 */
.dark .text-indigo-100 {
  color: #d6bcfa;
} /* dark:text-indigo-100 */
.dark .text-red-700 {
  color: #feb2b2;
} /* dark:text-red-100 */
.dark .bg-red-50 {
  background-color: #4c0517;
} /* dark:bg-red-900 */
.dark .text-red-500 {
  color: #fc8181;
} /* dark:text-red-300 */
.dark .text-gray-500 {
  color: #a0aec0;
} /* dark:text-gray-400 */
.dark .bg-gray-100 {
  background-color: #2d3748;
} /* dark:bg-gray-800 */
.dark .bg-indigo-50 {
  background-color: #4c0517;
} /* dark:bg-indigo-900 */
</style>
