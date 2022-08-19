<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="hide">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date }}</span>
      </div>

      <a
        class="dropdown-trigger black-text"
        href="#"
        data-target="dropdown1"
        ref="dropdown"
      >
      {{ name }}
        <i class="material-icons right">arrow_drop_down</i>
      </a>

      <ul id="dropdown1" class="dropdown-content">
        <li>
          <router-link :to="{ name: 'profile' }" class="black-text">
            <i class="material-icons">account_circle</i>Профиль
          </router-link>
        </li>
        <li class="divider" tabindex="-1"></li>
        <li>
          <a href="#!" class="black-text" @click.prevent="logout">
            <i class="material-icons">assignment_return</i>Выйти
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  emits: {
    hide: null
  },
  data () {
    return {
      date: null,
      interval: null
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      const dateOptions = {
        second: '2-digit',
        minute: '2-digit',
        hour: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
      this.date = Intl.DateTimeFormat('ru-RU', dateOptions).format(new Date())
    }, 1000)
    /* M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      coverTrigger: false
    }) */
  },
  beforeUnmount () {
    clearInterval(this.interval)
  }
}

</script>
