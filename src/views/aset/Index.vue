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
                        <h1 class="h3 mb-0 text-dark">Data Aset</h1>
                        <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60">
                            <i class="fas fa-download fa-sm text-white-55"></i> Tambah Data Aset
                        </button>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">List Data Aset Barang</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Aset</th>
                                            <th>Tipe Aset</th>
                                            <th>Jumlah</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="align-middle"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(aset, index) in list_data_aset.data" :key="index">
                                            <td class="align-middle">{{ aset.nama_asset }}</td>
                                            <td class="align-middle">{{ aset.type }}</td>
                                            <td class="align-middle">{{ aset.jumlah }}</td>
                                            <td class="align-middle">{{ aset.created_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-2">
                                                    <button class="btn btn-sm btn-success mb-2"  @click.prevent="edit(aset.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger mb-2" @click.prevent="confirmDelete(aset.id, index)">
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

    <div class="modal fade" id="updateAset" tabindex="-1" aria-labelledby="updateAsetLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateAsetLabel">Update Data Aset</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelNamaAset" placeholder="Loyang" v-model="data_aset.nama_asset">
                        <label for="labelNamaAset">Nama Aset : </label>
                        <div v-if="validation.nama_asset" class="text-danger">
                            {{ validation.nama_asset[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" v-model="data_aset.type">
                            <option selected>Pilih tipe aset</option>
                            <option value="aset">aset</option>
                            <option value="operasional">operasional</option>
                        </select>
                        <label for="floatingSelect">Tipe Aset : </label>
                        <div v-if="validation.type" class="text-danger">
                            {{ validation.type[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control border-0" id="labelJumlah" placeholder="1000" v-model="data_aset.jumlah">
                        <label for="labelJumlah" class="form-label">Jumlah Aset : </label>
                        <div v-if="validation.jumlah" class="text-danger">
                            {{ validation.jumlah[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" v-model="data_aset.satuan">
                            <option v-for="(satuan, index) in list_data_satuan.data" :key="index" v-bind:value="satuan.id">
                                {{satuan.nama_satuan}}
                            </option>
                        </select>
                        <label for="floatingSelect">Satuan : </label>
                        <div v-if="validation.type" class="text-danger">
                            {{ validation.type[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_aset.keterangan"></textarea>
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

    <div class="modal fade" id="tambahAset" tabindex="-1" aria-labelledby="tambahSatuanLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahSatuanLabel">Tambah Data Aset</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="labelNamaAset" placeholder="Loyang" v-model="data_aset.nama_asset">
                        <label for="labelNamaAset">Nama Aset : </label>
                        <div v-if="validation.nama_asset" class="text-danger">
                            {{ validation.nama_asset[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" v-model="data_aset.type">
                            <option selected>Pilih tipe aset</option>
                            <option value="aset">aset</option>
                            <option value="operasional">operasional</option>
                        </select>
                        <label for="floatingSelect">Tipe Aset : </label>
                        <div v-if="validation.type" class="text-danger">
                            {{ validation.type[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="labelJumlah" placeholder="1000" v-model="data_aset.jumlah">
                        <label for="labelJumlah" class="form-label">Jumlah Aset : </label>
                        <div v-if="validation.jumlah" class="text-danger">
                            {{ validation.jumlah[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" v-model="data_aset.satuan">
                            <option v-for="(satuan, index) in list_data_satuan.data" :key="index" v-bind:value="satuan.id">
                                {{satuan.nama_satuan}}
                            </option>
                        </select>
                        <label for="floatingSelect">Satuan : </label>
                        <div v-if="validation.type" class="text-danger">
                            {{ validation.type[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_aset.keterangan"></textarea>
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
        const data_aset = reactive({
            'nama_asset': '',
            'type': '',
            'jumlah': '',
            'satuan': '',
            'keterangan': '',
        });

        // reactive state
        let list_data_aset = ref([]);
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
            axios.post(`aset/list`, data_perpage)
            .then((result) => {
                list_data_aset.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function getDataSatuan() {
            axios.get(`satuan`)
            .then((result) => {
                list_data_satuan.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            this.getDataSatuan();
            this.data_aset.nama_asset = ''
            this.data_aset.type = ''
            this.data_aset.jumlah = ''
            this.data_aset.satuan = '';
            this.data_aset.keterangan = ''
            validation.value = ''

            $('#tambahAset').modal('show');
        }

        function hideModal() {
            $('#tambahAset').modal('hide');
        }

        function showModalEdit() {
            $('#updateAset').modal('show');
        }

        function hideModalEdit() {
            $('#updateAset').modal('hide');
            this.data_aset.nama_asset = ''
            this.data_aset.type = ''
            this.data_aset.jumlah = ''
            this.data_aset.satuan = ''
            this.data_aset.keterangan = ''
            validation.value = ''
        }

        function store() {
            axios.post('aset', data_aset)
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
            this.getDataSatuan();
            axios.get(`aset/${id}`)
            .then((result) => {
                data_aset.id = index
                data_aset.data_id = result.data.data.id
                data_aset.nama_asset = result.data.data.nama_asset
                data_aset.type = result.data.data.type
                data_aset.jumlah = result.data.data.jumlah
                data_aset.satuan = result.data.data.satuan
                data_aset.keterangan = result.data.data.keterangan
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`aset/${data_aset.data_id}`, data_aset)
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
                    axios.delete(`aset/${id}`)
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
            list_data_aset,
            list_data_satuan,
            data_aset,
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
            getDataSatuan,
            searchData,
            currentPage,
            perPage,
            total
        }
    },
}
</script>
