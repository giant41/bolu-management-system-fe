<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-12">
                <router-link 
                    :to="{ name: 'satuan.index' }"
                    class="btn btn-primary btn-sm rounded shadow mb-3"
                >Back</router-link>
            </div>

            <div class="card rounded shadow">
                <div class="card-header">
                    Tabah Data Satuan
                </div>
                <div class="card-body">
                    <form @submit.prevent="store()">
                        <div class="mb-3">
                            <label for="" class="form-label">Nama Satuan</label>
                            <input type="text" class="form-control" v-model="data_satuan.nama_satuan">
                            <div v-if="validation.nama_satuan" class="text-danger">
                                {{ validation.nama_satuan[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Simbol Satuan</label>
                            <input type="text" class="form-control" v-model="data_satuan.simbol_satuan">
                            <div v-if="validation.simbol_satuan" class="text-danger">
                                {{ validation.simbol_satuan[0] }}
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Keterangan</label>
                            <input type="text" class="form-control" v-model="data_satuan.keterangan">
                        </div>
                        <button class="btn btn-outline-primary">Simpan</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        // data binding
        const data_satuan = reactive({
            'nama_satuan': '',
            'simbol_satuan': '',
            'keterangan': '',
        });
        const validation = ref([]);
        const router = useRouter();

        function store() {
            axios.post('satuan', data_satuan)
            .then(() => {
                router.push({
                    name: 'satuan.index'
                });
            }).catch((err) => {
                validation.value = err.response.data
            });
        }

        return {
            data_satuan,
            validation,
            router,
            store
        }
    }
}
</script>
