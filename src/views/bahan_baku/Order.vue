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
                        <h1 class="h3 mb-0 text-dark">Order Bahan Baku</h1>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <!-- Content Column -->
                        <div class="col-xl-12">
                            <!-- Color System -->
                            <form @submit.prevent="saveOrder()">
                            <div class="row m-2 mb-0">
                                <div class="col-lg-3 mb-3">
                                    <div class="card bg-success text-white shadow">
                                        <div class="card-body">
                                            <div class="row">
                                                <label for="floatingSelect" class="col-sm-5 text-white-50 small">Nama Suplayer : </label>
                                                <div class="col-sm-12">
                                                    <select class="form-select" v-model="data_order.id_suplayer">
                                                        <option v-for="(suplayer, index) in list_data_suplayer.data" :key="index" v-bind:value="suplayer.id">
                                                            {{suplayer.nama_suplayer}}
                                                        </option>
                                                    </select>
                                                    <div v-if="validation.id_suplayer" class="text-warning">
                                                        {{ validation.id_suplayer[0] }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 mb-3">
                                    <div class="card bg-success text-white mb-4shadow">
                                        <div class="card-body">
                                            <div class="row">
                                                <label for="inputPassword" class="col-sm-12 text-white-50 small">Nomor Order : </label>
                                                <div class="col-sm-12">
                                                    <input type="number" min="0" v-model="data_order.nomor_order" class="form-control" disabled>
                                                    <div v-if="validation.nomor_order" class="text-warning">
                                                        {{ validation.nomor_order[0] }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="card bg-success text-white mb-4 shadow">
                                        <div class="card-body">
                                            <div class="row">
                                                <label for="inputPassword" class="col-sm-12 text-white-50 small">Tanggal Order : </label>
                                                <div class="col-sm-12">
                                                    <input type="date" v-model="data_order.tanggal_order" placeholder="dd-mm-yyyy" min="2021-07-01" max="2030-12-31" class="form-control">
                                                    <div v-if="validation.tanggal_order" class="text-warning">
                                                        {{ validation.tanggal_order[0] }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-2">
                                    <div class="card bg-transparent2" v-if="list_order_bahan_baku.data!=''">
                                        <button class="btn btn-order rounded-circle">
                                            <i class="fas fa-save fa-sm text-white-50"></i> Simpan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            </form>
                        </div>

                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Daftar Bahan Baku Yang Dipesan</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Bahan Baku</th>
                                            <th>Harga Satuan</th>
                                            <th>Jumlah (Qty)</th>
                                            <th class="align-middle">
                                                <div class="float-lg-end">
                                                    <button @click="showModal" type="button" class="btn btn-sm btn-primary shadow-sm text-white-60">
                                                        <i class="fas fa-plus"></i> Tambah
                                                    </button>
                                                    <button @click="clearData" type="button" class="btn btn-sm btn-warning ml-1 shadow-sm text-white-60">
                                                        <i class="far fa-trash-alt"></i> Kosongkan
                                                    </button>
                                                 </div>   
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(order, index) in list_order_bahan_baku.data" :key="index">
                                            <td class="align-middle">{{ order.nama_bahan_baku }}</td>
                                            <td class="align-middle">{{ order.harga }}</td>
                                            <td class="align-middle">{{ order.jumlah }} {{ order.satuan }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-2">
                                                    <button class="btn btn-sm btn-success shadow-sm mb-2"  @click.prevent="edit(order.id, index)">
                                                        <i class="fas fa-highlighter fa-sm text-white-50"></i> Edit
                                                    </button>
                                                    <button class="btn btn-sm btn-danger shadow-sm mb-2" @click.prevent="confirmDelete(order.id, index)">
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

    <div class="modal fade" id="updateOrderBahanBaku" tabindex="-1" aria-labelledby="updateBahanBakuLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="updateBahanBakuLabel">Update Order Bahan Baku</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="update()">
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
                        <input type="number" class="form-control" id="labelHargaSatuan" placeholder="15000" v-model="data_bahan_baku.harga_satuan">
                        <label for="labelHargaSatuan">Harga Satuan : </label>
                        <div v-if="validation.harga_satuan" class="text-danger">
                            {{ validation.harga_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="labelJumlahPesanan" placeholder="1000" v-model="data_bahan_baku.jumlah_pesanan">
                        <label for="labelJumlahPesanan">Jumlah Order : </label>
                        <div v-if="validation.jumlah_pesanan" class="text-danger">
                            {{ validation.jumlah_pesanan[0] }}
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

    <div class="modal fade" id="tambahOrderBahanBaku" tabindex="-1" aria-labelledby="tambahBhanBakuLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tambahBhanBakuLabel">Order Bahan Baku</h5>
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
                        <input type="number" class="form-control" id="labelHargaSatuan" placeholder="15000" v-model="data_bahan_baku.harga_satuan">
                        <label for="labelHargaSatuan">Harga Satuan : </label>
                        <div v-if="validation.harga_satuan" class="text-danger">
                            {{ validation.harga_satuan[0] }}
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="number" class="form-control" id="labelJumlahPesanan" placeholder="1000" v-model="data_bahan_baku.jumlah_pesanan">
                        <label for="labelJumlahPesanan">Jumlah Order : </label>
                        <div v-if="validation.jumlah_pesanan" class="text-danger">
                            {{ validation.jumlah_pesanan[0] }}
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
        const data_bahan_baku = reactive({
            'id_bahan_baku': '',
            'jumlah_pesanan': '',
            'harga_satuan': '',
        });
        const data_order = reactive({
            'id_suplayer': '',
            'nomor_order': '',
            'tanggal_order': '',
        });
        // reactive state
        let list_order_bahan_baku = ref([]);
        let list_data_bahan_baku = ref([]);
        let list_data_suplayer = ref([]);
        const validation = ref([]);
        const Swal = useSwal();
        let bahan_baku_eksis = 0;
        const nomorOrder = ref([]);
        let nextNoOrder = ref();
        const route = useRoute();
        const router = useRouter();
        const last_order = ref([]);

        onMounted(() => {
            getDataSuplayer();
            getData();
            getLastOrder();
        });

        // get last order number
        function getLastOrder() {
            axios.get(`/order-bahan-baku/last-order`)
            .then((result) => {
                nomorOrder.value = result.data.data;
                generateOrderNumber(nomorOrder.value);
            }).catch((err) => {
                console.log("Order data is empty")
                generateOrderNumber('20210101001');
            });
        }

        // genererate order number
        function generateOrderNumber(last_order_number) {
            const last_ord_number = last_order_number.toString();
            // split
            let last_month = last_ord_number.slice(0,6);
            let last_number = last_ord_number.slice(6,9);
            // get date today
            let today = new Date();
            // let curentDate = today.getFullYear()+''+("0" + (today.getMonth() + 1)).slice(-2)+''+("0" + today.getDate()).slice(-2);
            let curentDate = today.getFullYear()+''+("0" + (today.getMonth() + 1)).slice(-2);
            // set next order number
            if (curentDate == last_month) {
                // continue number order on current month
                let lastOrdNumber = Number(last_number)
                let nextOrdNumber = ('00' + (lastOrdNumber+1)).slice(-3)
                nextNoOrder.value =  curentDate+''+(nextOrdNumber);
            } else {
                // create new order number in new month
                nextNoOrder.value =  curentDate+''+'001';
            }
            data_order.nomor_order = nextNoOrder.value
        }

        // get teporary order data
        function getData() {
            axios.get(`temp-order`)
            .then((res) => {
                list_order_bahan_baku.value = res.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        // get all bahan baku data
        function getDataBahanBaku() {
            axios.get(`bahan-baku/alldata`)
            .then((result) => {
                list_data_bahan_baku.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        // get suplayer data
        function getDataSuplayer() {
            axios.get(`suplayer/alldata`)
            .then((result) => {
                list_data_suplayer.value = result.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        // show modal
        function showModal() {
            this.getDataBahanBaku();
            this.data_bahan_baku.id_bahan_baku = ''
            this.data_bahan_baku.jumlah_pesanan = ''
            this.data_bahan_baku.harga_satuan = ''
            validation.value = ''
            $('#tambahOrderBahanBaku').modal('show');
        }

        function hideModal() {
            $('#tambahOrderBahanBaku').modal('hide');
        }

        function showModalEdit() {
            $('#updateOrderBahanBaku').modal('show');
        }

        function hideModalEdit() {
            $('#updateOrderBahanBaku').modal('hide');
            this.data_bahan_baku.id_bahan_baku = ''
            this.data_bahan_baku.jumlah_pesanan = ''
            this.data_bahan_baku.harga_satuan = ''
            validation.value = ''
        }

        // store tambah bahan baku to api
        function store() {
            axios.get(`/temp-order/by-bahan-baku/${data_bahan_baku.id_bahan_baku}`)
            .then((res) => {
                // if bahan baku ordered is exist, then update the existing data
                if (res.data.data.length == 1) {
                    axios.put(`temp-order/${res.data.data[0].id}`, data_bahan_baku)
                    .then(() => {
                        this.getData()
                    }).catch((err) => {
                        validation.value = err.response.data
                    });
                } else {
                    // add new data to temporary order table
                    axios.post('/temp-order', data_bahan_baku)
                    .then(() => {
                        this.getData()
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

        // get temporary bahan baku from api
        function edit(id, index) {
            this.getDataBahanBaku();
            axios.get(`temp-order/${id}`)
            .then((result) => {
                data_bahan_baku.id = index
                data_bahan_baku.data_id = result.data.data.id 
                data_bahan_baku.id_bahan_baku = result.data.data.id_bahan_baku 
                data_bahan_baku.jumlah_pesanan = result.data.data.jumlah_pesanan 
                data_bahan_baku.harga_satuan = result.data.data.harga_satuan
                showModalEdit();
            }).catch((err) => {
                console.log("something error")
            });
        }

        // update temporary bahan baku
        function update() {
            axios.put(`temp-order/${data_bahan_baku.data_id}`, data_bahan_baku)
            .then(() => {
                this.getData()
                this.hideModalEdit()
            }).catch((err) => {
                validation.value = err.response.data
            });
        }

        // delete temporary
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
                    axios.delete(`temp-order/${id}`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "data berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1200
                        });
                        this.getData()
                        // list_data_satuan.value.data.splice(index, 1)
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

        // clear daftar bahan baku
        function clearData() {
            Swal.fire({
                // title: "Konfirmasi Hapus Data.",
                icon: "warning",
                text: "Apakah Anda Yakin? akan membersihkan data ini.?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Nya, Gaskeun mang.!",
                cancelButtonText: "Ulah Atuh",
                allowOutsideClick: false,
                timer: 10000
            }).then((result) => {
                if (result.value) {
                    axios.get(`/temp-order/remove-by-userid`)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "data berhasil dihapus",
                            showConfirmButton: false,
                            timer: 1200
                        });
                        this.getData()
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

        // save order bahan baku
        function saveOrder() {
            axios.post(`/order-bahan-baku`, data_order)
            .then(() => {
                router.push({
                    name: 'bahanBaku.listOrder'
                });
            }).catch((err) => {
                validation.value = err.response.data
            });
        }

        return {
            list_order_bahan_baku,
            list_data_bahan_baku,
            list_data_suplayer,
            last_order,
            data_bahan_baku,
            data_order,
            validation,
            showModal,
            hideModal,
            showModalEdit,
            hideModalEdit,            
            store,
            edit,
            update,
            confirmDelete,
            saveOrder,
            getData,
            getDataBahanBaku,
            getDataSuplayer,
            generateOrderNumber,
            getLastOrder,
            bahan_baku_eksis,
            nomorOrder,
            clearData
        }
    },
}
</script>
