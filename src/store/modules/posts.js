import axios from 'axios'

const API_URL = 'http://localhost:5000/api/posts/'
const UPLOAD_BASE_URL = 'http://localhost:5000' // NEW: Base URL untuk file yang diupload
const UPLOAD_API_ENDPOINT = `${UPLOAD_BASE_URL}/api/upload/` // NEW: URL lengkap untuk endpoint upload

const state = {
  posts: [],
  currentPost: null,
  pagination: { page: 1, pages: 1, count: 0 },
  loading: false,
  error: null,
}

const getters = {
  allPosts: (state) => state.posts,
  postDetail: (state) => state.currentPost,
  postsPagination: (state) => state.pagination,
  postsLoading: (state) => state.loading,
  postsError: (state) => state.error,
}

const mutations = {
  posts_request(state) {
    state.loading = true
    state.error = null
  },
  set_posts(state, data) {
    // Memastikan URL gambar diubah menjadi absolut saat diterima
    state.posts = data.posts.map((post) => ({
      ...post,
      image: post.image ? `${UPLOAD_BASE_URL}${post.image}` : '/uploads/default-post.jpg',
    }))
    state.pagination.page = data.page
    state.pagination.pages = data.pages
    state.pagination.count = data.count || state.posts.length
    state.loading = false
  },
  set_post_detail(state, post) {
    // Memastikan URL gambar diubah menjadi absolut saat diterima
    state.currentPost = {
      ...post,
      image: post.image ? `${UPLOAD_BASE_URL}${post.image}` : '/uploads/default-post.jpg',
    }
    state.loading = false
  },
  posts_error(state, error) {
    state.loading = false
    state.error = error
  },
  add_post(state, post) {
    // Memastikan URL gambar diubah menjadi absolut saat ditambahkan
    state.posts.unshift({
      ...post,
      image: post.image ? `${UPLOAD_BASE_URL}${post.image}` : '/uploads/default-post.jpg',
    })
    state.loading = false
  },
  update_post_in_list(state, updatedPost) {
    const index = state.posts.findIndex((post) => post._id === updatedPost._id)
    if (index !== -1) {
      // Memastikan URL gambar diubah menjadi absolut saat diperbarui
      state.posts.splice(index, 1, {
        ...updatedPost,
        image: updatedPost.image
          ? `${UPLOAD_BASE_URL}${updatedPost.image}`
          : '/uploads/default-post.jpg',
      })
    }
    state.loading = false
  },
  delete_post_from_list(state, postId) {
    state.posts = state.posts.filter((post) => post._id !== postId)
    state.loading = false
  },
}

const actions = {
  // Aksi untuk mengupload gambar
  async uploadImage({ commit }, imageFile) {
    commit('posts_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const formData = new FormData()
      formData.append('image', imageFile)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userToken}`,
        },
      }

      const { data } = await axios.post(UPLOAD_API_ENDPOINT, formData, config)
      // Mengembalikan path gambar yang diupload (sudah relatif dari backend)
      return Promise.resolve(data.image) // data.image dari backend seharusnya sudah `/uploads/filename.jpg`
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },

  async fetchPosts({ commit }, { page = 1, keyword = '', status = '' } = {}) {
    commit('posts_request')
    try {
      const response = await axios.get(
        `${API_URL}?pageNumber=${page}&keyword=${keyword}&status=${status}`,
      )
      commit('set_posts', response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
    }
  },
  async fetchPostBySlug({ commit }, slug) {
    commit('posts_request')
    try {
      const response = await axios.get(`${API_URL}${slug}`)
      commit('set_post_detail', response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
    }
  },
  async fetchPostById({ commit }, id) {
    commit('posts_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = { headers: { Authorization: `Bearer ${userToken}` } }
      const response = await axios.get(`${API_URL}id/${id}`, config)
      commit('set_post_detail', response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
  async createPost({ commit }, postData) {
    commit('posts_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      }
      const response = await axios.post(API_URL, postData, config)
      commit('add_post', response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
  async updatePost({ commit }, { id, postData }) {
    commit('posts_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      }
      const response = await axios.put(`${API_URL}${id}`, postData, config)
      commit('set_post_detail', response.data)
      commit('update_post_in_list', response.data)
      return Promise.resolve(response.data)
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
  async deletePost({ commit }, id) {
    commit('posts_request')
    try {
      const userToken = JSON.parse(localStorage.getItem('user')).token
      const config = { headers: { Authorization: `Bearer ${userToken}` } }
      await axios.delete(`${API_URL}${id}`, config)
      commit('delete_post_from_list', id)
      return Promise.resolve('Postingan berhasil dihapus.')
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message ? error.response.data.message : error.message
      commit('posts_error', errorMessage)
      return Promise.reject(errorMessage)
    }
  },
}

export default { namespaced: true, state, getters, mutations, actions }
