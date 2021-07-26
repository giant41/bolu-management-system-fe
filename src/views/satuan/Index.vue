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
                        <h1 class="h3 mb-0 text-dark">Satuan Barang</h1>
                        <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60" data-bs-whatever="@mdo">
                            <i class="fas fa-download fa-sm text-white-60"></i> Tambah Data Satuan
                        </button>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">List Data Satuan Barang</h6>
                                    
                                    <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                                    <!-- <a class="nav-link dropdown-toggle light" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-search fa-fw"></i>
                                    </a> -->
                                    <!-- Dropdown - Messages -->
                                    <!-- <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                    <form @submit.prevent="searchData()">
                                        <div class="input-group">
                                        <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." v-model="data_perpage.keyword">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="submit">
                                            <i class="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                        </div>
                                    </form>
                                    </div> -->
                                
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Satuan</th>
                                            <th>Simbol</th>
                                            <th>Keterangan</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="align-middle"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(satuan, index) in list_data_satuan.data" :key="index">
                                            <td class="align-middle">{{ satuan.nama_satuan }}</td>
                                            <td class="align-middle">{{ satuan.simbol_satuan }}</td>
                                            <td class="align-middle">{{ satuan.keterangan }}</td>
                                            <td class="align-middle">{{ satuan.created_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-3">
                                                    <button class="btn btn-sm btn-success mb-3 align-middle"  @click.prevent="edit(satuan.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger mb-3 align-middle" @click.prevent="confirmDelete(satuan.id, index)">
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

    <div class="modal fade" id="updateSatuan" tabindex="-1" aria-labelledby="updateSatuanLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateSatuanLabel">Update Data Satuan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="namaSatuan" placeholder="Kilogram" v-model="data_satuan.nama_satuan">
                        <label for="namaSatuan">Nama Satuan : </label>
                        <div v-if="validation.nama_satuan" class="text-danger">
                            {{ validation.nama_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="simbolSatuan"  placeholder="Kg" v-model="data_satuan.simbol_satuan">
                        <label for="simbolSatuan" class="form-label">Simbol Satuan : </label>
                        <div v-if="validation.simbol_satuan" class="text-danger">
                            {{ validation.simbol_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control border-0" id="labelketerangan" placeholder="keterangan" v-model="data_satuan.keterangan">
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

    <div class="modal fade" id="tambahSatuan" tabindex="-1" aria-labelledby="tambahSatuanLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahSatuanLabel">Tambah Data Satuan</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="namaSatuan" placeholder="Kilogram" v-model="data_satuan.nama_satuan">
                        <label for="namaSatuan">Nama Satuan : </label>
                        <div v-if="validation.nama_satuan" class="text-danger">
                            {{ validation.nama_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="simbolSatuan"  placeholder="Kg" v-model="data_satuan.simbol_satuan">
                        <label for="simbolSatuan" class="form-label">Simbol Satuan : </label>
                        <div v-if="validation.simbol_satuan" class="text-danger">
                            {{ validation.simbol_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control border-0" id="labelketerangan" placeholder="keterangan" v-model="data_satuan.keterangan">
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
        const data_satuan = reactive({
            'nama_satuan': '',
            'simbol_satuan': '',
            'keterangan': '',
        });

        // reactive state
        let list_data_satuan = ref([]);
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
            axios.post(`satuan/list`, data_perpage)
            .then((result) => {
                list_data_satuan.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            $('#tambahSatuan').modal('show');
            this.data_satuan.nama_satuan = ''
            this.data_satuan.simbol_satuan = ''
            this.data_satuan.keterangan = ''
            validation.value = ''
        }

        function hideModal() {
            $('#tambahSatuan').modal('hide');
        }

        function showModalEdit() {
            $('#updateSatuan').modal('show');
        }

        function hideModalEdit() {
            $('#updateSatuan').modal('hide');
            this.data_satuan.nama_satuan = ''
            this.data_satuan.simbol_satuan = ''
            this.data_satuan.keterangan = ''
            validation.value = ''
        }

        function store() {
            axios.post('satuan', data_satuan)
            
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
            axios.get(`satuan/${id}`)
            .then((result) => {
                data_satuan.id = index
                data_satuan.data_id = result.data.data.id
                data_satuan.nama_satuan = result.data.data.nama_satuan
                data_satuan.simbol_satuan = result.data.data.simbol_satuan
                data_satuan.keterangan = result.data.data.keterangan
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`satuan/${data_satuan.data_id}`, data_satuan)
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
                    axios.delete(`satuan/${id}`)
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
                            text: "ada kesalahn data gagal dihapus",
                            showConfirmButton: false,
                            timer: 3000
                        });
                    }); 
                }
            });  
        }

        return {
            list_data_satuan,
            data_satuan,
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
