<template>
  <router-view />

  <ScrollToTop />
  <LogoutConfirm />
</template>

<script>
import ScrollToTop from "./components/ScrollToTop.vue";
import LogoutConfirm from "./components/LogoutConfirm.vue";

export default {
  name: 'App',
  async created() {
      this.$store.dispatch('user', localStorage.getItem('user'))
  },
  components: {
    ScrollToTop,
    LogoutConfirm,
  },
}
</script>