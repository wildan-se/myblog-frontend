<template>
  <div class="p-6 bg-white shadow-md category-management rounded-xl">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">Manajemen Kategori</h2>

    <!-- Formulir Tambah Kategori Baru -->
    <form @submit.prevent="addCategory" class="flex items-end mb-8 space-x-4">
      <div class="flex-grow">
        <label for="newCategoryName" class="block mb-2 text-sm font-medium text-gray-700"
          >Nama Kategori Baru:</label
        >
        <input
          type="text"
          id="newCategoryName"
          v-model="newCategoryName"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Masukkan nama kategori"
          required
        />
      </div>
      <button
        type="submit"
        :disabled="categoriesLoading"
        class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="categoriesLoading">Menambahkan...</span>
        <span v-else>Tambah Kategori</span>
      </button>
    </form>

    <!-- Kondisi Tampilan Daftar Kategori (Loading, Error, No Data, Data Available) -->
    <div
      v-if="categoriesLoading && allCategories.length === 0"
      class="py-12 text-center text-gray-600"
    >
      <p>Memuat kategori...</p>
      <div
        class="w-10 h-10 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"
      ></div>
    </div>
    <div v-else-if="categoriesError" class="py-6 text-center text-red-600">
      <p>Terjadi kesalahan: {{ categoriesError }}</p>
    </div>
    <div v-else-if="allCategories.length === 0" class="py-6 text-center text-gray-500">
      <p>Belum ada kategori.</p>
    </div>
    <ul v-else class="space-y-4">
      <li
        v-for="category in allCategories"
        :key="category._id"
        class="flex flex-col items-start justify-between p-4 rounded-lg shadow-sm sm:flex-row sm:items-center bg-gray-50"
      >
        <!-- Mode Tampilan Kategori (Saat Tidak Diedit) -->
        <template v-if="editingCategoryId !== category._id">
          <span class="text-lg font-medium text-gray-800">{{ category.name }}</span>
          <div class="flex items-center mt-2 space-x-3 sm:mt-0">
            <button
              @click="startEdit(category)"
              class="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button
              @click="confirmDelete(category._id)"
              class="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Hapus
            </button>
          </div>
        </template>

        <!-- Mode Edit Kategori -->
        <template v-else>
          <div
            class="flex flex-col items-start flex-grow w-full sm:flex-row sm:items-center sm:space-x-4"
          >
            <input
              type="text"
              v-model="editingCategoryName"
              class="flex-grow w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm sm:w-auto"
            />
            <div class="flex mt-2 space-x-2 sm:mt-0">
              <button
                @click="saveEdit()"
                :disabled="categoriesLoading || !editingCategoryName.trim()"
                class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simpan
              </button>
              <button
                @click="cancelEdit()"
                class="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
              >
                Batal
              </button>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { useToast } from 'vue-toastification' // Impor useToast

export default {
  name: 'CategoryManagement',
  // Menggunakan setup() hook untuk mendapatkan instance toast
  setup() {
    const toast = useToast()
    return { toast } // Mengembalikan instance toast agar dapat diakses oleh Options API
  },
  data() {
    return {
      newCategoryName: '',
      editingCategoryId: null,
      editingCategoryName: '',
    }
  },
  computed: {
    ...mapGetters('categories', ['allCategories', 'categoriesLoading', 'categoriesError']),
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    ...mapActions('categories', [
      'fetchCategories',
      'createCategory',
      'updateCategory',
      'deleteCategory',
    ]),

    // Metode untuk menambahkan kategori baru
    async addCategory() {
      if (!this.newCategoryName.trim()) {
        this.toast.error('Nama kategori tidak boleh kosong.') // Menggunakan this.toast.error
        return
      }
      try {
        await this.createCategory(this.newCategoryName)
        this.toast.success('Kategori berhasil ditambahkan!') // Menggunakan this.toast.success
        this.newCategoryName = '' // Mengosongkan input setelah berhasil
      } catch (error) {
        console.error('Error adding category:', error) // Log error ke konsol
        this.toast.error('Gagal menambahkan kategori: ' + this.categoriesError) // Memberikan feedback error kepada pengguna melalui toast
      }
    },

    // Metode untuk memulai mode edit untuk kategori tertentu
    startEdit(category) {
      this.editingCategoryId = category._id // Menyimpan ID kategori yang akan diedit
      this.editingCategoryName = category.name // Mengisi input edit dengan nama kategori saat ini
    },

    // Metode untuk membatalkan mode edit
    cancelEdit() {
      this.editingCategoryId = null // Mereset ID kategori yang diedit (keluar dari mode edit)
      this.editingCategoryName = '' // Mengosongkan input edit
    },

    // Metode untuk menyimpan perubahan kategori yang diedit
    async saveEdit() {
      if (!this.editingCategoryName.trim() || !this.editingCategoryId) {
        this.toast.error('Nama kategori tidak boleh kosong.') // Validasi: Nama tidak boleh kosong
        return
      }
      try {
        await this.updateCategory({
          id: this.editingCategoryId, // Meneruskan ID kategori yang diedit
          name: this.editingCategoryName, // Meneruskan nama baru
        })
        this.toast.success('Kategori berhasil diperbarui!') // Feedback sukses
        this.cancelEdit() // Keluar dari mode edit setelah berhasil
      } catch (error) {
        console.error('Error updating category:', error) // Log error
        this.toast.error('Gagal memperbarui kategori: ' + this.categoriesError) // Feedback error
      }
    },

    // Metode untuk mengkonfirmasi dan menghapus kategori
    async confirmDelete(categoryId) {
      // Menggunakan confirm() bawaan browser untuk konfirmasi aksi yang bersifat destruktif
      if (
        confirm(
          'Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.',
        )
      ) {
        try {
          await this.deleteCategory(categoryId) // Memanggil aksi Vuex `deleteCategory`
          this.toast.info('Kategori berhasil dihapus!') // Feedback sukses menggunakan toast.info
          // Tidak perlu refetch, karena mutasi Vuex sudah menangani reaktivitas (menghapus kategori dari state)
        } catch (error) {
          console.error('Error deleting category:', error) // Log error
          this.toast.error('Gagal menghapus kategori: ' + this.categoriesError) // Feedback error
        }
      }
    },
  },
}
</script>
