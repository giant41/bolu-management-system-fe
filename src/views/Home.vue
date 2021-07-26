<template>
    <Nav />

    <div class="container my-5">
        <div class="row justify-content-center">

            <div class="card rounded shadow">
                <div class="card-header">
                    <h3 v-if="!user">Silahkan Login</h3>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../components/Nav.vue";
import {mapGetters} from 'vuex'

export default {
    components: {
        Nav
    },
    computed: {
        ...mapGetters(['user'])
    }
}
</script>
