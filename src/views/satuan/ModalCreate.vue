
<template>
    <div class="modal fade" id="tambahSatuan" tabindex="-1" aria-labelledby="tambahSatuanLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahSatuanLabel">Tambah Data Satuan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="mb-3">
                        <label for="" class="form-label">Nama Satuan</label>
                        <input type="text" class="form-control" v-model="data_satuan.nama_satuan">
                        <!-- <div v-if="validation.nama_satuan" class="text-danger"> -->
                            <!-- {{ validation.nama_satuan[0] }} -->
                        <!-- </div> -->
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Simbol Satuan</label>
                        <input type="text" class="form-control" v-model="data_satuan.simbol_satuan">
                        <!-- <div v-if="validation.simbol_satuan" class="text-danger"> -->
                            <!-- {{ validation.simbol_satuan[0] }} -->
                        <!-- </div> -->
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Keterangan</label>
                        <input type="text" class="form-control" v-model="data_satuan.keterangan">
                    </div>
                    <div class="mb-3 right float-end">
                        <button class="btn btn-outline-primary">Simpan</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import { reactive, onMounted, ref, computed  } from 'vue'
import axios from 'axios'

export default {
    name: 'FormModalCreateSatuan',
    setup() {
        
        const satuan = useStore();
        const data_satuan = computed(() => satuan.state);
        console.log(data_satuan);
                // reactive state
        let list_data_satuan = ref([]);
        const validation = ref([]);


        function store() {
            axios.post('satuan', data_satuan)
            
            .then((result) => {
                this.hideModal()
                list_data_satuan.value.data.unshift(result.data.data);
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data
                }    
            });
        }

        return {
            data_satuan,
            store
        };
     },
};
</script>



