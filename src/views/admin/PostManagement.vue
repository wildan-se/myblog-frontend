<template>
  <div class="p-6 bg-white shadow-md post-management rounded-xl">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">Manajemen Postingan</h2>

    <div class="flex items-center justify-between mb-6">
      <router-link
        to="/admin/posts/new"
        class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Buat Postingan Baru
      </router-link>
      <div class="flex space-x-2">
        <input
          type="text"
          v-model="searchKeyword"
          @input="debouncedFetchPosts"
          placeholder="Cari postingan..."
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <select
          v-model="postStatusFilter"
          @change="fetchPostsWithFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Semua Status</option>
          <!-- PENTING: Value kosong untuk semua status -->
          <option value="published">Diterbitkan</option>
          <option value="draft">Draf</option>
        </select>
      </div>
    </div>

    <div v-if="postsLoading" class="py-12 text-center text-gray-600">
      <p>Memuat postingan...</p>
      <div
        class="w-10 h-10 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="postsError" class="py-6 text-center text-red-600">
      <p>Terjadi kesalahan: {{ postsError }}</p>
    </div>
    <div v-else-if="allPosts.length === 0" class="py-6 text-center text-gray-500">
      <p>Belum ada postingan yang ditemukan.</p>
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Judul
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Kategori
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Penulis
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Status
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              Tanggal
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Aksi</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="post in allPosts" :key="post._id">
            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
              {{ post.title }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ post.category ? post.category.name : 'N/A' }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ post.author ? post.author.name : 'N/A' }}
            </td>
            <td class="px-6 py-4 text-sm whitespace-nowrap">
              <span
                :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-yellow-100 text-yellow-800': post.status === 'draft',
                }"
              >
                {{ post.status === 'published' ? 'Diterbitkan' : 'Draf' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {{ new Date(post.createdAt).toLocaleDateString('id-ID') }}
            </td>
            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <router-link
                :to="`/admin/posts/edit/${post._id}`"
                class="mr-4 text-indigo-600 hover:text-indigo-900"
                >Edit</router-link
              >
              <button @click="confirmDelete(post._id)" class="text-red-600 hover:text-red-900">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="postsPagination.pages > 1" class="flex items-center justify-center mt-8 space-x-3">
      <button
        @click="changePage(postsPagination.page - 1)"
        :disabled="postsPagination.page === 1 || postsLoading"
        class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sebelumnya
      </button>
      <span class="text-gray-700"
        >Halaman {{ postsPagination.page }} dari {{ postsPagination.pages }}</span
      >
      <button
        @click="changePage(postsPagination.page + 1)"
        :disabled="postsPagination.page === postsPagination.pages || postsLoading"
        class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Berikutnya
      </button>
    </div>
  </div>
</template>

<script>
// 1. Importasi Pustaka dan Helper
import { mapActions, mapGetters } from 'vuex' // Mengimpor helper `mapActions` dan `mapGetters` dari Vuex.
// Ini memudahkan pemetaan actions dan getters dari Vuex store ke properti/metode komponen.
import debounce from 'lodash.debounce' // Mengimpor fungsi `debounce` dari pustaka `lodash.debounce`.
// Fungsi ini digunakan untuk menunda eksekusi fungsi hingga jeda waktu tertentu berlalu sejak pemanggilan terakhirnya.

export default {
  name: 'PostManagement', // Nama komponen Vue. Berguna untuk debugging di Vue Devtools.

  data() {
    // Fungsi `data()` mengembalikan objek yang berisi state reaktif komponen.
    // Properti di sini akan dapat diakses di template dan akan memicu render ulang saat nilainya berubah.
    return {
      searchKeyword: '', // Menyimpan nilai input dari kolom pencarian.
      postStatusFilter: '', // Menyimpan nilai yang dipilih dari dropdown filter status ('', 'published', atau 'draft').
      // Defaultnya string kosong ('') agar backend mengambil semua status untuk admin.
      currentPage: 1, // Menyimpan nomor halaman saat ini untuk pagination.
    }
  },

  computed: {
    // Objek `computed` mendefinisikan properti yang dihitung secara reaktif.
    // Nilainya di-cache berdasarkan dependensinya dan hanya dihitung ulang jika dependensi berubah.
    ...mapGetters('posts', ['allPosts', 'postsLoading', 'postsError', 'postsPagination']),
    // `...mapGetters('posts', [...])`:
    //   - Memetakan getters dari modul Vuex 'posts' ke properti computed komponen ini.
    //   - `allPosts`: Mengakses daftar postingan dari Vuex store.
    //   - `postsLoading`: Mengakses status loading dari Vuex store (true saat API request berlangsung).
    //   - `postsError`: Mengakses pesan error dari Vuex store jika terjadi kesalahan.
    //   - `postsPagination`: Mengakses objek pagination dari Vuex store (page, pages, count).
  },

  created() {
    // `created()` adalah lifecycle hook yang dipanggil setelah instance komponen dibuat
    // dan properti `data` serta `computed` telah diinisialisasi, tetapi DOM belum dirender.
    // Ini adalah tempat yang tepat untuk memuat data awal.
    this.fetchPostsWithFilter() // Memanggil metode `fetchPostsWithFilter` untuk memuat data postingan awal.

    // Menginisialisasi fungsi `debouncedFetchPosts`.
    // Ini adalah versi `fetchPostsWithFilter` yang di-debounce.
    // Ketika `debouncedFetchPosts` dipanggil berulang kali (misal: saat pengguna mengetik di kolom pencarian),
    // fungsi `fetchPostsWithFilter` yang sebenarnya hanya akan dieksekusi setelah jeda 500ms
    // tanpa pemanggilan `debouncedFetchPosts` lainnya.
    this.debouncedFetchPosts = debounce(this.fetchPostsWithFilter, 500)
  },

  methods: {
    // Objek `methods` mendefinisikan fungsi-fungsi yang dapat dipanggil dari template atau dari dalam komponen.
    ...mapActions('posts', ['fetchPosts', 'deletePost']),
    // `...mapActions('posts', [...])`:
    //   - Memetakan actions dari modul Vuex 'posts' ke metode komponen ini.
    //   - `fetchPosts`: Memetakan aksi untuk mengambil postingan (termasuk filter, pagination).
    //   - `deletePost`: Memetakan aksi untuk menghapus postingan.

    // Metode untuk memuat postingan dengan filter dan pagination saat ini.
    fetchPostsWithFilter() {
      // Memanggil aksi Vuex `fetchPosts`.
      // Meneruskan properti `currentPage`, `searchKeyword`, dan `postStatusFilter` sebagai parameter.
      // Aksi Vuex akan menggunakan parameter ini untuk membangun URL permintaan ke backend.
      this.fetchPosts({
        page: this.currentPage,
        keyword: this.searchKeyword,
        status: this.postStatusFilter, // Penting: kirimkan filter status
      })
    },

    // Metode untuk mengubah halaman pagination
    changePage(newPage) {
      // Validasi: Pastikan nomor halaman baru valid (lebih dari 0 dan tidak melebihi total halaman).
      if (newPage > 0 && newPage <= this.postsPagination.pages) {
        this.currentPage = newPage // Memperbarui `currentPage` di data komponen.
        this.fetchPostsWithFilter() // Memanggil `fetchPostsWithFilter` untuk memuat postingan di halaman baru.
      }
    },

    // Metode untuk mengkonfirmasi dan menghapus postingan
    async confirmDelete(postId) {
      // Menggunakan fungsi `confirm()` bawaan browser untuk meminta konfirmasi pengguna.
      if (confirm('Apakah Anda yakin ingin menghapus postingan ini?')) {
        try {
          await this.deletePost(postId) // Memanggil aksi Vuex `deletePost` dengan ID postingan.
          // `await` menunggu operasi penghapusan selesai.
          this.fetchPostsWithFilter() // Setelah penghapusan berhasil, memuat ulang daftar postingan
          // untuk menyegarkan tampilan (karena item sudah dihapus dari database).
          alert('Postingan berhasil dihapus!') // Memberikan feedback sukses kepada pengguna.
        } catch (error) {
          console.error('Error deleting post:', error) // Log error ke konsol.
          alert('Gagal menghapus postingan: ' + this.postsError) // Memberikan feedback error kepada pengguna.
        }
      }
    },
  },

  watch: {
    // Objek `watch` memungkinkan Anda untuk menjalankan fungsi ketika properti data tertentu berubah.
    // 'postsPagination.page': Mengamati perubahan pada properti `page` di dalam objek `postsPagination` (dari Vuex getter).
    // Ini berguna jika pagination diubah dari luar komponen ini atau jika ada state yang perlu disinkronkan.
    'postsPagination.page'(newPage) {
      this.currentPage = newPage // Memperbarui `currentPage` lokal komponen agar selalu sinkron dengan state pagination Vuex.
    },
  },
}
</script>
