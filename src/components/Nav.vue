<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" v-if="!user">
            <li class="nav-item">
                <router-link class="nav-link active"  aria-current="page" to="./">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
        </ul>
        <ul class="navbar-nav" v-if="user">
            <li class="nav-item">
                <router-link class="nav-link active"  aria-current="page" to="./">Home</router-link>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)" @click="handleClickLogout" class="nav-link">Logout</a>
            </li>
        </ul>
    </div>
  </div>
</nav>
</template>>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Nav',
    async created() {
        this.$store.dispatch('user', localStorage.getItem('user'))
    },
    methods: {
        handleClickLogout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.$router.push('/');
        }
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
