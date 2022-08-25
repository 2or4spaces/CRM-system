<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>

      <app-loader v-if="loading" />

      <div class="row" v-else>

        <app-category-create @created="addNewCategory" />

        <app-category-edit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategory" />

      </div>
    </section>
  </div>
</template>

<script>
import AppCategoryCreate from '@/components/AppCategoryCreate.vue'
import AppCategoryEdit from '@/components/AppCategoryEdit.vue'

export default {
  components: {
    AppCategoryCreate, AppCategoryEdit
  },
  data () {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategory (categoryData) {
      const idx = this.categories.findIndex(cat => cat.id === categoryData.id)
      this.categories[idx].title = categoryData.title
      this.categories[idx].limit = categoryData.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
