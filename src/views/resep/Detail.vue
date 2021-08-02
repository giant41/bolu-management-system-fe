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
                        <h1 class="h3 mb-0 text-dark">Data Resep Detail</h1>
                        <!-- <div class="col-2"> -->
                            <router-link 
                                :to="{ name: 'resep.index' }"
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
                                        <div class="card-body" v-if="data_resep">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Nama Resep</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_resep">{{data_resep.data.nama_resep}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12 text-white-50 small" v-if="data_resep">*{{data_resep.data.keterangan}}</div>
                                            </div>
                                            <hr class="sidebar-divider">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Created by</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_resep">{{data_resep.data.created_by}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Created At</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_resep">{{data_resep.data.created_at}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Updated by</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_resep">{{data_resep.data.updated_by}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Updated At</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="data_resep">{{data_resep.data.updated_at}}</div>
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
                                    <h6 class="m-0 font-weight-bold text-primary">Detail Bahan Baku Pada Resep ini</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Bahan Baku</th>
                                            <th>Jumlah Takaran</th>
                                            <th>Keterangan</th>
                                            <th>Created By</th>
                                            <th>Updated By</th>
                                            <th>Created At </th>
                                            <th>Updated At </th>
                                            <th class="align-middle">
                                                <div class="float-lg-end ">
                                                    <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60">
                                                        <i class="fas fa-download fa-sm text-white-60"></i> Tambah Bahan Baku
                                                    </button>
                                                </div>    
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(detail, index) in list_resep_bahan_baku.data" :key="index">
                                            <td class="align-middle">{{ detail.bahan_baku.nama_bahan_baku }}</td>
                                            <td class="align-middle">{{ detail.bahan_baku.jumlah_bahan_baku }} {{ detail.bahan_baku.simbol_satuan }}</td>
                                            <td class="align-middle">{{ detail.keterangan }}</td>
                                            <td class="align-middle">{{ detail.created_by }}</td>
                                            <td class="align-middle">{{ detail.updated_by }}</td>
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

    <div class="modal fade" id="updateBahanBaku" tabindex="-1" aria-labelledby="updateBahanBakuLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateBahanBakuLabel">Update Data Bahan Baku</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
                    <div class="form-floating mb-3">
                        <select class="form-select" disabled id="floatingSelect" v-model="data_bahan_baku.id_bahan_baku">
                            <option v-for="(bahan_baku, index) in list_data_bahan_baku.data" :key="index" v-bind:value="bahan_baku.id">
                                {{bahan_baku.nama_bahan_baku}}
                            </option>
                        </select>
                        <label for="floatingSelect">Bahan Baku : </label>
                        <div v-if="validation.id_bahan_baku" class="text-danger">
                            {{ validation.id_bahan_baku[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_bahan_baku.jumlah_bahan_baku">
                        <label for="labelJumlahBahanBaku">Jumlah Bahan Baku : </label>
                        <div v-if="validation.jumlah_bahan_baku" class="text-danger">
                            {{ validation.jumlah_bahan_baku[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_bahan_baku.keterangan"></textarea>
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

    <div class="modal fade" id="tambahBahanBaku" tabindex="-1" aria-labelledby="tambahBhanBakuLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahBhanBakuLabel">Tambah Data Bahan Baku</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="store()">
                    <div class="form-floating mb-3">
                        <select class="form-select" id="floatingSelect" v-model="data_bahan_baku.id_bahan_baku">
                            <option v-for="(bahan_baku, index) in list_data_bahan_baku.data" :key="index" v-bind:value="bahan_baku.id">
                                {{bahan_baku.nama_bahan_baku}}
                            </option>
                        </select>
                        <label for="floatingSelect">Bahan Baku : </label>
                        <div v-if="validation.id_bahan_baku" class="text-danger">
                            {{ validation.id_bahan_baku[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" min="0" class="form-control" id="labelJumlahBahanBaku" placeholder="100" v-model="data_bahan_baku.jumlah_bahan_baku">
                        <label for="labelJumlahBahanBaku">Jumlah Bahan Baku : </label>
                        <div v-if="validation.jumlah_bahan_baku" class="text-danger">
                            {{ validation.jumlah_bahan_baku[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" placeholder="keterangan" id="labelketerangan" style="height: 100px"  v-model="data_bahan_baku.keterangan"></textarea>
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
        const data_bahan_baku = reactive({
            'jumlah_bahan_baku': '',
            'id_bahan_baku': '',
            'keterangan': ''
        });

        // reactive state
        let data_resep = ref();
        let list_resep_bahan_baku = ref([]);
        let list_data_bahan_baku = ref([]);
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
            axios.get(`/resep/detail-resep/${route.params.id}`)
            .then((res) => {
                data_resep.value = res.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function getDataDetail(page) {
            axios.post(`/resep-detail/list`, data_perpage)
            .then((result) => {
                list_resep_bahan_baku.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        // get all data bahan baku
        function getDataBahanBaku() {
            axios.get(`bahan-baku/alldata`)
            .then((result) => {
                list_data_bahan_baku.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        function showModal() {
            this.getDataBahanBaku();
            this.data_bahan_baku.id_resep = route.params.id;
            this.data_bahan_baku.id_bahan_baku = '';
            this.data_bahan_baku.jumlah_bahan_baku = ''
            this.data_bahan_baku.keterangan = ''
            validation.value = ''

            $('#tambahBahanBaku').modal('show');
        }

        function hideModal() {
            $('#tambahBahanBaku').modal('hide');
        }

        function showModalEdit() {
            $('#updateBahanBaku').modal('show');
        }

        function hideModalEdit() {
            $('#updateBahanBaku').modal('hide');
            this.data_bahan_baku.id_bahan_baku = '';
            this.data_bahan_baku.jumlah_bahan_baku = ''
            this.data_bahan_baku.keterangan = ''
            validation.value = ''
        }

        function store() {
            axios.post('/resep-detail/resep-by-id', data_bahan_baku)
            .then((res) => {
                if (res.data.data.length == 1) {
                    // update last data
                    axios.put(`/resep-detail/${res.data.data[0].id}`, data_bahan_baku)
                    .then(() => {
                        this.getDataDetail()
                    }).catch((err) => {
                        validation.value = err.response.data
                    });
                } else {
                    // add new data to resep table
                    axios.post('/resep-detail', data_bahan_baku)
                    .then(() => {
                        let first_page = 1;
                        getDataDetail(first_page);
                    }).catch((err) => {
                        if(err.response) {
                            validation.value = err.response.data
                        }    
                    });
                }

                this.hideModal()
            }).catch((err) => {
                if(err.response) {
                    console.log('emmm ada yg salah!!');
                }    
            });
        }

        function edit(id, index) {
            this.getDataBahanBaku();
            console.log(id);
            axios.get(`/resep-detail/${id}`)
            .then((result) => {
                data_bahan_baku.id = index
                data_bahan_baku.id_resep = route.params.id;
                data_bahan_baku.data_id = result.data.data.id;
                data_bahan_baku.id_bahan_baku = result.data.data.id_bahan_baku
                data_bahan_baku.jumlah_bahan_baku = result.data.data.jumlah_bahan_baku
                data_bahan_baku.keterangan = result.data.data.keterangan
                showModalEdit()
            }).catch((err) => {
                console.log("something error")
            });
        }

        function update() {
            axios.put(`/resep-detail/${data_bahan_baku.data_id}`, data_bahan_baku)
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
                    axios.delete(`/resep-detail/${id}`)
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
            list_resep_bahan_baku,
            data_resep,
            list_data_bahan_baku,
            data_bahan_baku,
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
            getDataBahanBaku,
            searchData,
            currentPage,
            perPage,
            total
        }
    },
}
</script>
