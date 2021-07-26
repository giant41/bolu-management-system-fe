<template>
    <Nav />

    <div class="container my-5">
        <div class="row justify-content-center">

            <div class="card rounded shadow">
                <div class="card-header">
                    Login Page
                </div>

                <div v-if="validation.message">
                    <br>
                    <div class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                            <use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                            {{ validation.message }}
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleLogin()">
                        <div class="mb-3">
                            <label for="" class="form-label">Email</label>
                            <input type="text" class="form-control" v-model="logins.email">
                            <div v-if="validation.email" class="text-danger">
                                {{ validation.email[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="logins.password">
                            <div v-if="validation.password" class="text-danger">
                                {{ validation.password[0] }}
                            </div>
                        </div>
                        <button class="btn btn-outline-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "../../components/Nav.vue";
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

export default {
    components: {
        Nav
    },
    setup() {
        // data binding
        const logins = reactive({
            'email': '',
            'password': ''
        });
        const validation = ref([]);
        const router = useRouter();

        function handleLogin() {
            axios.post('/login', logins)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', res.data.data.name);
                router.push({
                    name: 'dashboard.index'
                });
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data;
                }
            });
        }

        return {
            logins,
            validation,
            router,
            handleLogin
        }
    }
}
</script>
