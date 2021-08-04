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
                        <h1 class="h3 mb-0 text-dark">Data Produksi</h1>
                        <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60" data-bs-whatever="@mdo">
                            <i class="fas fa-download fa-sm text-white-60"></i> Tambah Produksi
                        </button>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">List Data Produksi</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Resep</th>
                                            <th>Keterangan</th>
                                            <th>Created By</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="align-middle"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(resep, index) in list_data_resep.data" :key="index">
                                            <td class="align-middle">{{ resep.nama_resep }}</td>
                                            <td class="align-middle">{{ resep.keterangan }}</td>
                                            <td class="align-middle">{{ resep.created_by }}</td>
                                            <td class="align-middle">{{ resep.created_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-2">
                                                    <router-link :to="{ name:'resep.detail', params:{id:resep.id}}" class="btn btn-sm btn-primary shadow-sm mb-2">
                                                        <i class="fas fa-book-medical fa-sm text-white-50"></i> Detail Resep
                                                    </router-link>
                                                    <button class="btn btn-sm btn-success mb-2"  @click.prevent="edit(resep.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger mb-2" @click.prevent="confirmDelete(resep.id, index)">
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

    <div class="modal fade" id="updateResep" tabindex="-1" aria-labelledby="updateResepLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateResepLabel">Update Data Resep</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="namaResep" placeholder="Nama Resep" v-model="data_resep.nama_resep">
                        <label for="namaResep">Nama Reasep : </label>
                        <div v-if="validation.nama_resep" class="text-danger">
                            {{ validation.nama_resep[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_resep.keterangan"></textarea>
                        <label for="labelketerangan" class="form-label">Keterangan : </label>
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

    <div class="modal fade" id="tambahResep" tabindex="-1" aria-labelledby="tambahResepLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahResepLabel">Tambah Data Resep</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="namaResep" placeholder="Nama Resep" v-model="data_resep.nama_resep">
                        <label for="namaResep">Nama Resep : </label>
                        <div v-if="validation.nama_resep" class="text-danger">
                            {{ validation.nama_resep[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_resep.keterangan"></textarea>
                        <label for="labelketerangan" class="form-label">Keterangan : </label>
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
        const data_resep = reactive({
            'nama_resep': '',
            'keterangan': ''
        });

        // reactive state
        let list_data_resep = ref([]);
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
            axios.post(`resep/list`, data_perpage)
            .then((result) => {
                list_data_resep.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            $('#tambahResep').modal('show');
            this.data_resep.nama_resep = ''
            this.data_resep.keterangan = ''
            validation.value = ''
        }

        function hideModal() {
            $('#tambahResep').modal('hide');
        }

        function showModalEdit() {
            $('#updateResep').modal('show');
        }

        function hideModalEdit() {
            $('#updateResep').modal('hide');
            this.data_resep.nama_resep = ''
            this.data_resep.keterangan = ''
            validation.value = ''
        }

        function store() {
            axios.post('resep', data_resep)
            
            .then(() => {
                this.hideModal()
                let first_page = 1;
                getData(first_page);
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data
                }    
            });
        }

        function edit(id, index) {
            axios.get(`resep/${id}`)
            .then((result) => {
                data_resep.id = index
                data_resep.data_id = result.data.data.id
                data_resep.nama_resep = result.data.data.nama_resep
                data_resep.keterangan = result.data.data.keterangan
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`resep/${data_resep.data_id}`, data_resep)
            .then(() => {
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
                    axios.delete(`resep/${id}`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "data berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1500
                        });
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
            list_data_resep,
            data_resep,
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
