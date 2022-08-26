<template>
  <ul class="sidenav app-sidenav" :class="{ open: show }">
    <li
      v-for="link in links"
      :key="link.title"
      >
      <router-link
        :to="{ name: link.route }"
        exact-active-class="card-panel"
        class="waves-effect waves-orange pointer">
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: true }
  },
  data () {
    return {
      links: [
        { title: 'Счет', route: 'home' },
        { title: 'История', route: 'history' },
        { title: 'Планирование', route: 'planning' },
        { title: 'Новая запись', route: 'record' },
        { title: 'Категории', route: 'categories' }
      ]
    }
  }
}
</script>
