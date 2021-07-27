
<template>
    <div id="wrapper">
        <SideBar />
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <DashboardHeaderNav
                    @send-keyword="searchData($event)" />
                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between m-3 mb-4">
                        <h1 class="h3 mb-0 text-dark">Data Suplayer</h1>
                        <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60">
                            <i class="fas fa-download fa-sm text-white-60"></i> Tambah Data Suplayer
                        </button>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">List Data Suplayer</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Suplayer</th>
                                            <th>Alamat</th>
                                            <th>No Telp/HP</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="align-middle"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(suplayer, index) in list_data_suplayer.data" :key="index">
                                            <td class="align-middle">{{ suplayer.nama_suplayer }}</td>
                                            <td class="align-middle">{{ suplayer.alamat }}</td>
                                            <td class="align-middle">{{ suplayer.no_telp }}</td>
                                            <td class="align-middle">{{ suplayer.created_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-3">
                                                    <button class="btn btn-sm btn-success mb-3 align-middle"  @click.prevent="edit(suplayer.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger mb-3 align-middle" @click.prevent="confirmDelete(suplayer.id, index)">
                                                        <i class="fas fa-trash fa-sm text-white-50"></i> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>    
                                        </tbody>
                                    </table>
                                    <!-- Pagination -->
                                    <div v-if=" total > perPage">
                                        <Pagination 
                                            :current="currentPage"
                                            :total="total"
                                            :per-page="perPage"
                                            @page-changed="onPageClick($event)"
                                        />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            <!-- /.container-fluid -->
            <DashboardFooter />
            </div>
        <!-- End of Main Content -->
        </div>
    </div>
    <!-- End of Content Wrapper -->

    <div class="modal fade" id="updateSuplayer" tabindex="-1" aria-labelledby="updateSuplayerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateSuplayerLabel">Update Data Satuan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelSuplayer" placeholder="PT. Angin Ribut" v-model="data_suplayer.nama_suplayer">
                        <label for="labelSuplayer">Nama Suplayer : </label>
                        <div v-if="validation.nama_suplayer" class="text-danger">
                            {{ validation.nama_suplayer[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelAlamat"  placeholder="Jl. Babakan Tarogong No. 1000" v-model="data_suplayer.alamat">
                        <label for="labelAlamat" class="form-label">Alamat Suplayer : </label>
                        <div v-if="validation.alamat" class="text-danger">
                            {{ validation.alamat[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="labelTelp" placeholder="02245000 / 0812345" v-model="data_suplayer.no_telp">
                        <label for="labelTelp" class="form-label">No. Telp/HP : </label>
                        <div v-if="validation.no_telp" class="text-danger">
                            {{ validation.no_telp[0] }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-danger btn-sm float-end">
                            <i class="fas fa-save fa-sm text-white-50"></i> Update
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="tambahSuplayer" tabindex="-1" aria-labelledby="tambahSuplayerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahSuplayerLabel">Tambah Data Suplayer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelSuplayer" placeholder="PT. Angin Ribut" v-model="data_suplayer.nama_suplayer">
                        <label for="labelSuplayer">Nama Suplayer : </label>
                        <div v-if="validation.nama_suplayer" class="text-danger">
                            {{ validation.nama_suplayer[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelAlamat"  placeholder="Jl. Babakan Tarogong No. 1000" v-model="data_suplayer.alamat">
                        <label for="labelAlamat" class="form-label">Alamat Suplayer : </label>
                        <div v-if="validation.alamat" class="text-danger">
                            {{ validation.alamat[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="labelTelp" placeholder="02245000 / 0812345" v-model="data_suplayer.no_telp">
                        <label for="labelTelp" class="form-label">No. Telp/HP : </label>
                        <div v-if="validation.no_telp" class="text-danger">
                            {{ validation.no_telp[0] }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-danger btn-sm float-right">
                            <i class="fas fa-save fa-sm text-white-50 dark"></i> Simpan
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from "../../components/SideBar.vue";
import DashboardHeaderNav from "../../components/DashboardHeaderNav.vue";
import DashboardFooter from "../../components/DashboardFooter.vue";
import Pagination from "../../components/Pagination.vue";
import axios from 'axios';
import { reactive, onMounted, ref } from 'vue';
import { useSwal } from "../../useSwal";

export default {
    components: {
        SideBar,
        DashboardHeaderNav,
        DashboardFooter,
        Pagination
    },
    setup() {
        // data binding
        const data_suplayer = reactive({
            'nama_suplayer': '',
            'alamat': '',
            'no_telp': '',
        });

        // reactive state
        let list_data_suplayer = ref([]);
        const validation = ref([]);
        const Swal = useSwal();
        let currentPage = ref();
        let perPage = 10;
        let total = ref();
        let keyword = ref();

        const data_perpage = reactive({
            'page' : currentPage,
            'per_page': perPage,
            'keyword': keyword
        });

        onMounted(() => {
            // get data from api endpoint
            let first_page = 1;
            getData(first_page);
        });

        function onPageClick(event) {
            this.currentPage = event;
            this.getData(this.currentPage);
        }

        function searchData(event) {
            keyword.value = event;
            this.currentPage = 1;
            this.getData(this.currentPage);
        }

        function getData(page) {
            axios.post(`suplayer/list`, data_perpage)
            .then((result) => {
                list_data_suplayer.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            $('#tambahSuplayer').modal('show');
            this.data_suplayer.nama_suplayer = ''
            this.data_suplayer.alamat = ''
            this.data_suplayer.no_telp = ''
            validation.value = ''
        }

        function hideModal() {
            $('#tambahSuplayer').modal('hide');
        }

        function showModalEdit() {
            $('#updateSuplayer').modal('show');
        }

        function hideModalEdit() {
            $('#updateSuplayer').modal('hide');
            this.data_suplayer.nama_suplayer = ''
            this.data_suplayer.alamat = ''
            this.data_suplayer.no_telp = ''
            validation.value = ''
        }

        function store() {
            axios.post('suplayer', data_suplayer)
            
            .then((result) => {
                this.hideModal()
                // list_data_satuan.value.data.unshift(result.data.data);
                let first_page = 1;
                getData(first_page);
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data
                }    
            });
        }

        function edit(id, index) {
            axios.get(`suplayer/${id}`)
            .then((result) => {
                data_suplayer.id = index
                data_suplayer.data_id = result.data.data.id
                data_suplayer.nama_suplayer = result.data.data.nama_suplayer
                data_suplayer.alamat = result.data.data.alamat
                data_suplayer.no_telp = result.data.data.no_telp
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`suplayer/${data_suplayer.data_id}`, data_suplayer)
            .then((result) => {
                this.hideModalEdit()
                getData(currentPage.value);
            }).catch((err) => {
                validation.value = err.response.data
            });
        }

        function confirmDelete(id, index) {
            Swal.fire({
                // title: "Konfirmasi Hapus Data.",
                icon: "warning",
                text: "Apakah Anda Yakin? akan menghapus data ini.?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Nya, Gaskeun mang.!",
                cancelButtonText: "Ulah Atuh",
                allowOutsideClick: false,
                timer: 10000
            }).then((result) => {
                if (result.value) {
                    axios.delete(`suplayer/${id}`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "data berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // list_data_satuan.value.data.splice(index, 1)
                        getData(currentPage.value);
                    }).catch((err) => {
                        console.log(err.response.data)
                        Swal.fire({
                            icon: "error",
                            text: "ada kesalahan, data gagal dihapus!",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }); 
                }
            });  
        }

        return {
            list_data_suplayer,
            data_suplayer,
            data_perpage,
            validation,
            showModal,
            hideModal,
            showModalEdit,
            hideModalEdit,            
            store,
            edit,
            update,
            confirmDelete,
            onPageClick,
            getData,
            searchData,
            currentPage,
            perPage,
            total
        }
    },
}
</script>
