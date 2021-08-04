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
                        <h1 class="h3 mb-0 text-dark">Histori Data Produk</h1>
                        <!-- <div class="col-2"> -->
                            <router-link 
                                :to="{ name: 'produk.index' }"
                                class="btn btn-sm btn-primary shadow-sm text-white-60"
                            >Back</router-link>
                        <!-- </div> -->
                    </div>
                    <!-- Content Row -->
                    <div class="row">

                        <!-- Content Column -->
                        <div class="col-lg-8  m-3  mb-0">
                            <!-- Color System -->
                            <div class="row">
                                <div class="col-lg-6 mb-4">
                                    <div class="card bg-success text-white shadow">
                                        <div class="card-body" v-if="data_produk">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Nama Resep</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_produk">{{data_produk.data.nama_produk}}</div>
                                            </div>
                                            <hr class="sidebar-divider">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Created At</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_produk">{{data_produk.data.created_at}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Updated At</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_produk">{{data_produk.data.updated_at}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Histori perubahan Harga</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Harga Dasar</th>
                                            <th>Harga Jual</th>
                                            <th>Created At </th>
                                            <th>Updated At </th>
                                            <th class="align-middle">
                                                <div class="float-lg-end ">
                                                    <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60">
                                                        <i class="fas fa-download fa-sm text-white-60"></i> Update Harga
                                                    </button>
                                                </div>    
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(detail, index) in list_harga_produk.data" :key="index">
                                            <td class="align-middle">{{ detail.harga_dasar }}</td>
                                            <td class="align-middle">{{ detail.harga_jual }}</td>
                                            <td class="align-middle">{{ detail.created_at }}</td>
                                            <td class="align-middle">{{ detail.updated_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-2">
                                                    <button class="btn btn-sm btn-success shadow-sm mb-2"  @click.prevent="edit(detail.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger shadow-sm mb-2" @click.prevent="confirmDelete(detail.id, index)">
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

    <div class="modal fade" id="updateHarga" tabindex="-1" aria-labelledby="updateHargaLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateHargaLabel">Update Data Harga</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_harga.harga_dasar">
                        <label for="labelJumlahBahanBaku">Harga Dasar : </label>
                        <div v-if="validation.harga_dasar" class="text-danger">
                            {{ validation.harga_dasar[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_harga.harga_jual">
                        <label for="labelJumlahBahanBaku">Harga Jual : </label>
                        <div v-if="validation.harga_jual" class="text-danger">
                            {{ validation.harga_jual[0] }}
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

    <div class="modal fade" id="tambahHarga" tabindex="-1" aria-labelledby="tambahHargaLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahHargaLabel">Tambah Harga</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_harga.harga_dasar">
                        <label for="labelJumlahBahanBaku">Harga Dasar : </label>
                        <div v-if="validation.harga_dasar" class="text-danger">
                            {{ validation.harga_dasar[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_harga.harga_jual">
                        <label for="labelJumlahBahanBaku">Harga Jual : </label>
                        <div v-if="validation.harga_jual" class="text-danger">
                            {{ validation.harga_jual[0] }}
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
import { useRoute, useRouter } from 'vue-router'
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
        const data_harga = reactive({
            'harga_dasar': '',
            'harga_jual': ''
        });

        // reactive state
        let data_produk = ref();
        let list_harga_produk = ref([]);
        const validation = ref([]);
        const Swal = useSwal();
        let currentPage = ref();
        let perPage = 10;
        let total = ref();
        let keyword = ref();
        const route = useRoute();

        const data_perpage = reactive({
            'page' : currentPage,
            'per_page': perPage,
            'keyword': keyword,
            'id': route.params.id
        });

        onMounted(() => {
            // get data from api endpoint
            let first_page = 1;
            getDataDetail(first_page);
            getData();
        });

        function onPageClick(event) {
            this.currentPage = event;
            this.getDataDetail(this.currentPage);
        }

        function searchData(event) {
            keyword.value = event;
            this.currentPage = 1;
            this.getDataDetail(this.currentPage);
        }

        function getData() {
            axios.get(`/produk/${route.params.id}`)
            .then((res) => {
                data_produk.value = res.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function getDataDetail(page) {
            axios.post(`/harga-produk/list`, data_perpage)
            .then((result) => {
                list_harga_produk.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            this.data_harga.id_produk = route.params.id;
            this.data_harga.harga_dasar = '';
            this.data_harga.harga_jual = ''
            validation.value = ''
            $('#tambahHarga').modal('show');
        }

        function hideModal() {
            $('#tambahHarga').modal('hide');
        }

        function showModalEdit() {
            $('#updateHarga').modal('show');
        }

        function hideModalEdit() {
            $('#updateHarga').modal('hide');
            this.data_harga.id_produk = '';
            this.data_harga.harga_dasar = ''
            this.data_harga.harga_jual = ''
            validation.value = ''
        }

        function store() {
            axios.post('/harga-produk', data_harga)
            .then(() => {
                let first_page = 1;
                getDataDetail(first_page);
                this.hideModal()
            }).catch((err) => {
                if(err.response) {
                    validation.value = err.response.data
                }    
            });
        }

        function edit(id, index) {
            axios.get(`/harga-produk/${id}`)
            .then((result) => {
                data_harga.id = index
                data_harga.id_produk = route.params.id;
                data_harga.data_id = result.data.data.id;
                data_harga.harga_dasar = result.data.data.harga_dasar
                data_harga.harga_jual = result.data.data.harga_jual
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`/harga-produk/${data_harga.data_id}`, data_harga)
            .then((result) => {
                this.hideModalEdit()
                getDataDetail(currentPage.value);
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
                    axios.delete(`/harga-produk/${id}`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "data berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        getDataDetail(currentPage.value);
                    }).catch((err) => {
                        Swal.fire({
                            icon: "error",
                            text: "ada kesalahan, data gagal dihapus",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }); 
                }
            });  
        }

        return {
            list_harga_produk,
            data_produk,
            data_harga,
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
            getDataDetail,
            searchData,
            currentPage,
            perPage,
            total
        }
    },
}
</script>
