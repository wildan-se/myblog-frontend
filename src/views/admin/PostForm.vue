<template>
  <div class="p-6 bg-white shadow-md post-form rounded-xl">
    <h2 class="mb-6 text-3xl font-bold text-gray-800">
      {{ isEditing ? 'Edit Postingan' : 'Buat Postingan Baru' }}
    </h2>

    <form @submit.prevent="submitPost">
      <div class="mb-4">
        <label for="title" class="block mb-1 text-sm font-medium text-gray-700">Judul:</label>
        <input
          type="text"
          id="title"
          v-model="post.title"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div class="mb-4">
        <label for="category" class="block mb-1 text-sm font-medium text-gray-700">Kategori:</label>
        <select
          id="category"
          v-model="post.category"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Pilih Kategori</option>
          <option v-for="cat in allCategories" :key="cat._id" :value="cat._id">
            {{ cat.name }}
          </option>
        </select>
        <p v-if="categoriesLoading" class="mt-1 text-sm text-gray-500">Memuat kategori...</p>
        <p v-if="categoriesError" class="mt-1 text-sm text-red-500">
          Gagal memuat kategori: {{ categoriesError }}
        </p>
      </div>

      <div class="mb-4">
        <label for="imageUpload" class="block mb-1 text-sm font-medium text-gray-700"
          >Upload Gambar:</label
        >
        <input
          type="file"
          id="imageUpload"
          @change="handleFileChange"
          accept="image/*"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <p class="mt-1 text-xs text-gray-500">Pilih file gambar (JPG, PNG, GIF, WEBP, maks 5MB).</p>

        <div v-if="imagePreviewUrl" class="mt-4">
          <p class="mb-2 text-sm font-medium text-gray-700">Pratinjau Gambar:</p>
          <img
            :src="imagePreviewUrl"
            alt="Pratinjau Gambar"
            class="h-auto max-w-xs border border-gray-200 rounded-lg shadow-md"
          />
          <button
            @click="removeImage"
            type="button"
            class="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Hapus Gambar
          </button>
        </div>
        <div
          v-else-if="post.image && post.image !== '/uploads/default-post.jpg' && !selectedFile"
          class="mt-4"
        >
          <p class="mb-2 text-sm font-medium text-gray-700">Gambar Saat Ini:</p>
          <img
            :src="post.image"
            alt="Gambar Postingan Saat Ini"
            class="h-auto max-w-xs border border-gray-200 rounded-lg shadow-md"
          />
          <button
            @click="removeImage"
            type="button"
            class="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Hapus Gambar
          </button>
        </div>
      </div>

      <div class="mb-4">
        <label for="content" class="block mb-1 text-sm font-medium text-gray-700"
          >Konten Postingan:</label
        >
        <textarea
          id="content"
          v-model="post.content"
          rows="10"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          required
        ></textarea>
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Status:</label>
        <div class="flex items-center space-x-4">
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="text-indigo-600 form-radio"
              name="status"
              value="draft"
              v-model="post.status"
            />
            <span class="ml-2 text-gray-700">Draf</span>
          </label>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="text-indigo-600 form-radio"
              name="status"
              value="published"
              v-model="post.status"
            />
            <span class="ml-2 text-gray-700">Diterbitkan</span>
          </label>
        </div>
      </div>

      <div
        v-if="postsError"
        class="relative px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded"
        role="alert"
      >
        <span class="block sm:inline">Terjadi kesalahan: {{ postsError }}</span>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="$router.push('/admin/posts')"
          class="px-6 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="postsLoading"
          class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="postsLoading">Menyimpan...</span>
          <span v-else>{{ isEditing ? 'Perbarui Postingan' : 'Buat Postingan' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PostForm',
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      post: {
        title: '',
        content: '',
        category: '',
        image: '',
        status: 'draft',
      },
      isEditing: false,
      selectedFile: null,
      imagePreviewUrl: null,
    }
  },
  computed: {
    ...mapGetters('posts', ['postsLoading', 'postsError', 'postDetail']),
    ...mapGetters('categories', ['allCategories', 'categoriesLoading', 'categoriesError']),
  },
  async created() {
    await this.fetchCategories()
    if (this.id) {
      this.isEditing = true
      await this.fetchPostById(this.id)
      if (this.postDetail) {
        this.post.title = this.postDetail.title
        this.post.content = this.postDetail.content
        this.post.category = this.postDetail.category ? this.postDetail.category._id : ''
        this.post.image = this.postDetail.image
        this.post.status = this.postDetail.status
        this.imagePreviewUrl = this.post.image
      }
    } else {
      this.isEditing = false
      this.post = {
        title: '',
        content: '',
        category: '',
        image: '/uploads/default-post.jpg',
        status: 'draft',
      }
      this.selectedFile = null
      this.imagePreviewUrl = null
    }
  },
  methods: {
    ...mapActions('posts', ['createPost', 'updatePost', 'fetchPostById', 'uploadImage']),
    ...mapActions('categories', ['fetchCategories']),

    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedFile = file
        this.imagePreviewUrl = URL.createObjectURL(file)
      } else {
        this.selectedFile = null
        this.imagePreviewUrl = null
        if (!this.post.image || this.post.image === '/uploads/default-post.jpg') {
          this.post.image = '/uploads/default-post.jpg'
        }
      }
    },

    removeImage() {
      this.selectedFile = null
      this.imagePreviewUrl = null
      this.post.image = '/uploads/default-post.jpg'
      const fileInput = document.getElementById('imageUpload')
      if (fileInput) {
        fileInput.value = ''
      }
    },

    async submitPost() {
      if (!this.post.title.trim() || !this.post.content.trim() || !this.post.category) {
        alert('Judul, konten, dan kategori wajib diisi.') // Kembali ke alert()
        return
      }

      try {
        if (this.selectedFile) {
          const uploadedImagePath = await this.uploadImage(this.selectedFile)
          this.post.image = uploadedImagePath
        } else if (!this.post.image || this.post.image.includes('default-post.jpg')) {
          this.post.image = '/uploads/default-post.jpg'
        }

        if (this.isEditing) {
          await this.updatePost({ id: this.id, postData: this.post })
          alert('Postingan berhasil diperbarui!') // Kembali ke alert()
        } else {
          await this.createPost(this.post)
          alert('Postingan berhasil dibuat!') // Kembali ke alert()
        }

        this.$router.push('/admin/posts')
      } catch (error) {
        console.error('Error saving post:', error)
        alert(
          'Gagal menyimpan postingan: ' + (this.postsError || 'Terjadi kesalahan tidak dikenal.'),
        ) // Kembali ke alert()
      }
    },
  },
  beforeUnmount() {
    if (this.imagePreviewUrl && this.selectedFile) {
      URL.revokeObjectURL(this.imagePreviewUrl)
    }
  },
}
</script>
