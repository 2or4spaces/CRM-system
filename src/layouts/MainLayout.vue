<template>
  <app-loader v-if="loading"/>
  <div class="app-main-layout" v-else>

    <app-navbar @hide="toggleSidebar"/>

    <app-sidebar :show="isOpen"/>

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" :to="{ name: 'record' }">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/app/AppNavbar.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'

export default {
  components: {
    AppNavbar, AppSidebar
  },
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  methods: {
    toggleSidebar () {
      this.isOpen = !this.isOpen
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  computed: {

  }
}

</script>
