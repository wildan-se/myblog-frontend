<template>
  <div class="container px-4 py-8 mx-auto post-detail">
    <div v-if="postsLoading" class="py-12 text-xl text-center text-gray-600">
      <p>Memuat postingan...</p>
      <div
        class="w-12 h-12 mx-auto mt-4 border-b-2 border-indigo-500 rounded-full animate-spin"
      ></div>
    </div>

    <div v-else-if="postsError" class="py-12 text-xl text-center text-red-600">
      <p>Terjadi kesalahan saat memuat postingan: {{ postsError }}</p>
      <router-link to="/" class="inline-block mt-4 text-indigo-600 hover:underline"
        >Kembali ke Beranda</router-link
      >
    </div>

    <div
      v-else-if="postDetail"
      class="p-8 bg-white border border-gray-200 shadow-lg rounded-xl lg:p-12"
    >
      <div class="w-full mb-8 overflow-hidden bg-gray-200 rounded-lg h-96">
        <img
          :src="postDetail.image"
          :alt="postDetail.title"
          class="object-cover w-full h-full"
          @error="handleImageError"
        />
      </div>

      <div class="flex items-center justify-between mb-4 text-sm text-gray-600">
        <p>
          Oleh <span class="font-semibold text-indigo-700">{{ postDetail.author.name }}</span> pada
          {{
            new Date(postDetail.createdAt).toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </p>
        <span
          v-if="postDetail.category"
          class="inline-block px-3 py-1 text-sm font-semibold text-indigo-800 bg-indigo-100 rounded-full"
          >{{ postDetail.category.name }}</span
        >
      </div>

      <h1 class="mb-6 text-5xl font-extrabold leading-tight text-gray-900">
        {{ postDetail.title }}
      </h1>

      <div
        class="text-lg leading-relaxed prose text-gray-800 max-w-none"
        v-html="postDetail.content"
      ></div>

      <div class="mt-12 text-center">
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Kembali ke Beranda
        </router-link>
      </div>

      <div class="pt-10 mt-16 border-t border-gray-300">
        <h2 class="mb-6 text-3xl font-bold text-gray-800">Komentar ({{ postComments.length }})</h2>

        <div
          v-if="commentsLoading && postComments.length === 0"
          class="py-4 text-center text-gray-600"
        >
          Memuat komentar...
          <div
            class="w-8 h-8 mx-auto mt-2 border-b-2 border-indigo-400 rounded-full animate-spin"
          ></div>
        </div>
        <div v-else-if="commentsError" class="py-4 text-center text-red-600">
          Gagal memuat komentar: {{ commentsError }}
        </div>
        <div v-else-if="postComments.length === 0" class="p-6 text-gray-700 rounded-lg bg-gray-50">
          <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </div>
        <div v-else class="space-y-6">
          <div
            v-for="comment in postComments"
            :key="comment._id"
            class="p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <template v-if="editingCommentId !== comment._id">
              <div class="flex items-center mb-2">
                <p class="font-semibold text-gray-800">{{ comment.user.name }}</p>
                <span class="ml-auto text-xs text-gray-500">
                  {{
                    new Date(comment.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}
                </span>
              </div>
              <p class="text-gray-700">{{ comment.content }}</p>

              <div
                v-if="
                  isAuthenticated &&
                  currentUser &&
                  (currentUser._id === comment.user._id || isAdmin)
                "
                class="flex justify-end mt-3 space-x-3"
              >
                <button
                  @click="startEditComment(comment)"
                  class="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  @click="confirmDeleteComment(comment._id)"
                  class="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Hapus
                </button>
              </div>
            </template>

            <template v-else>
              <div class="mb-2">
                <label :for="`editComment-${comment._id}`" class="sr-only">Edit Komentar:</label>
                <textarea
                  :id="`editComment-${comment._id}`"
                  v-model="editingCommentContent"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                ></textarea>
              </div>
              <div class="flex justify-end space-x-3">
                <button
                  @click="cancelEditComment()"
                  class="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  @click="saveEditedComment(comment._id)"
                  :disabled="!editingCommentContent.trim() || commentsLoading"
                  class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan
                </button>
              </div>
              <p v-if="commentsError" class="mt-3 text-sm text-red-600">
                Gagal menyimpan perubahan: {{ commentsError }}
              </p>
            </template>
          </div>
        </div>

        <div class="p-6 mt-8 bg-white border border-gray-200 rounded-lg shadow-md">
          <h3 class="mb-4 text-2xl font-bold text-gray-800">Tambahkan Komentar</h3>
          <p v-if="!isAuthenticated" class="mb-4 text-sm text-red-500">
            Anda harus
            <router-link to="/login" class="text-indigo-600 hover:underline">login</router-link>
            untuk berkomentar.
          </p>
          <form @submit.prevent="submitComment">
            <div class="mb-4">
              <label for="commentContent" class="sr-only">Komentar Anda:</label>
              <textarea
                id="commentContent"
                v-model="newCommentContent"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tulis komentar Anda di sini..."
                :disabled="!isAuthenticated || commentsLoading"
                required
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="!isAuthenticated || commentsLoading || !newCommentContent.trim()"
                class="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="commentsLoading">Mengirim...</span>
                <span v-else>Kirim Komentar</span>
              </button>
            </div>
            <p v-if="commentsError" class="mt-3 text-sm text-red-600">
              Gagal mengirim komentar: {{ commentsError }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PostDetailView',
  props: ['slug'],
  data() {
    return {
      newCommentContent: '',
      editingCommentId: null,
      editingCommentContent: '',
    }
  },
  computed: {
    ...mapGetters('posts', ['postDetail', 'postsLoading', 'postsError']),
    ...mapGetters('comments', ['postComments', 'commentsLoading', 'commentsError']),
    ...mapGetters('auth', ['isAuthenticated', 'currentUser', 'isAdmin']),
  },
  async created() {
    // Fetches post details based on the slug from the URL.
    await this.fetchPostBySlug(this.slug)

    // If post details are successfully loaded, then fetch comments for that post.
    if (this.postDetail) {
      this.fetchCommentsForPost(this.postDetail._id)
    }
  },
  methods: {
    ...mapActions('posts', ['fetchPostBySlug']),
    ...mapActions('comments', [
      'fetchCommentsForPost',
      'addComment',
      'updateComment',
      'deleteComment',
    ]),

    async submitComment() {
      if (!this.newCommentContent.trim() || !this.isAuthenticated || !this.postDetail) {
        return
      }
      try {
        await this.addComment({
          postId: this.postDetail._id,
          content: this.newCommentContent,
        })
        this.newCommentContent = '' // Clear the input field
      } catch (error) {
        console.error('Error submitting comment:', error)
        // Error message will be displayed via commentsError getter
      }
    },

    startEditComment(comment) {
      this.editingCommentId = comment._id
      this.editingCommentContent = comment.content
    },

    cancelEditComment() {
      this.editingCommentId = null
      this.editingCommentContent = ''
      this.$store.commit('comments/comments_error', null) // Clear any comment-related errors
    },

    async saveEditedComment(commentId) {
      if (!this.editingCommentContent.trim()) {
        alert('Konten komentar tidak boleh kosong.')
        return
      }
      if (!this.postDetail) {
        alert('Postingan tidak ditemukan.')
        return
      }

      try {
        await this.updateComment({
          postId: this.postDetail._id,
          commentId: commentId,
          content: this.editingCommentContent,
        })
        alert('Komentar berhasil diperbarui!')
        this.cancelEditComment()
      } catch (error) {
        console.error('Error updating comment:', error)
        alert('Gagal memperbarui komentar: ' + this.commentsError)
      }
    },

    async confirmDeleteComment(commentId) {
      if (!this.postDetail) {
        alert('Postingan tidak ditemukan.')
        return
      }
      if (confirm('Apakah Anda yakin ingin menghapus komentar ini?')) {
        try {
          await this.deleteComment({
            postId: this.postDetail._id,
            commentId: commentId,
          })
          alert('Komentar berhasil dihapus!')
        } catch (error) {
          console.error('Error deleting comment:', error)
          alert('Gagal menghapus komentar: ' + this.commentsError)
        }
      }
    },

    handleImageError(event) {
      // Sets default image if the provided image fails to load.
      event.target.src = '/uploads/default-post.jpg'
    },
  },
}
</script>

<style>
/* Styling untuk konten HTML yang di-render oleh v-html */
.prose {
  line-height: 1.75;
  font-size: 1.125rem; /* text-lg */
}

.prose p {
  margin-bottom: 1.25em;
  white-space: pre-wrap;
  text-align: left;
}

.prose h1,
.prose h2,
.prose h3 {
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  text-align: left;
}
.prose h1 {
  font-size: 2.25rem; /* text-4xl */
}
.prose h2 {
  font-size: 1.875rem; /* text-3xl */
}
.prose h3 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600;
}

.prose a {
  color: #4c51bf; /* indigo-600 */
  text-decoration: underline;
  font-weight: 500;
}
.prose ul,
.prose ol {
  margin-left: 1.5em;
  margin-bottom: 1.25em;
  text-align: left;
}
.prose ul li {
  list-style-type: disc;
  margin-bottom: 0.5em;
}
.prose ol li {
  list-style-type: decimal;
  margin-bottom: 0.5em;
}
.prose pre {
  background-color: #e2e8f0; /* gray-200 */
  padding: 1.25em;
  border-radius: 0.75em;
  overflow-x: auto;
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  line-height: 1.4;
  font-size: 0.9em;
  white-space: pre-wrap;
  text-align: left;
}
.prose code {
  font-family: 'Fira Code', 'Roboto Mono', monospace;
  background-color: #e2e8f0;
  padding: 0.2em 0.4em;
  border-radius: 0.3em;
  color: #553c9a; /* deep purple, for code consistency */
}
</style>
