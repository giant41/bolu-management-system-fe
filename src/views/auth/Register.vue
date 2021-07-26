<template>
    <Nav />

    <div class="container my-5">
        <div class="row justify-content-center">

            <div class="card rounded shadow">
                <div class="card-header">
                    Register User Page
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSubmit()">
                        <div class="mb-3">
                            <label for="" class="form-label">Nama</label>
                            <input type="text" class="form-control" v-model="registers.name">
                            <div v-if="validation.name" class="text-danger">
                                {{ validation.name[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="registers.email">
                            <div v-if="validation.email" class="text-danger">
                                {{ validation.email[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="registers.password">
                            <div v-if="validation.password" class="text-danger">
                                {{ validation.password[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="registers.password_confirmation">
                            <div v-if="validation.password_confirmation" class="text-danger">
                                {{ validation.password_confirmation[0] }}
                            </div>
                        </div>
                        <button class="btn btn-outline-primary">Register</button>
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
        const registers = reactive({
            'name': '',
            'email': '',
            'password': '',
            'password_confirmation': '',
        });
        const validation = ref([]);
        const router = useRouter();

        function handleSubmit() {
            axios.post('/register', registers)
            .then(() => {
                router.push({
                    name: 'auth.login'
                });
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data;
                }
            });
        }

        return {
            registers,
            validation,
            router,
            handleSubmit
        }
    }
}
</script>
