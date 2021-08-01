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
                        <h1 class="h3 mb-0 text-dark">List Pemesanan Bahan Baku</h1>
                        <router-link  :to="{ name: 'bahanBaku.order' }" class="btn btn-primary btn-sm rounded shadow mb-3">
                            <i class="fas fa-download fa-sm text-white-60"></i> Order Bahan Baku
                        </router-link>
                    </div>
                    <!-- Content Row -->
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card shadow m-3 mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">List Data Pemesanan Bahan Baku</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nomor Order</th>
                                            <th>Suplayer</th>
                                            <th>Tanggal Order</th>
                                            <th>Item</th>
                                            <th>Harga Total</th>
                                            <th>Status</th>
                                            <th>Dipesan Oleh</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="align-middle"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(bahan_baku, index) in list_data_pemesanan.data" :key="index">
                                            <td class="align-middle">{{ bahan_baku.nomor_order }}</td>
                                            <td class="align-middle">{{ bahan_baku.nama_suplayer }} </td>
                                            <td class="align-middle">{{ bahan_baku.tanggal_order }} </td>
                                            <td class="align-middle">{{ bahan_baku.total_item }} </td>
                                            <td class="align-middle">{{ bahan_baku.jumlah_total }} </td>
                                            <td class="align-middle">{{ bahan_baku.status }} </td>
                                            <td class="align-middle">{{ bahan_baku.created_by }} </td>
                                            <td class="align-middle">{{ bahan_baku.created_at }}</td>
                                            <td class="align-middle">
                                                <div class="btn-group float-lg-end mt-2">
                                                    <router-link :to="{ name:'bahanBaku.orderDetail', params:{id:bahan_baku.id}}" class="btn btn-sm btn-primary shadow-sm mb-2">
                                                        <i class="fas fa-book-medical fa-sm text-white-50"></i> Detail
                                                    </router-link>
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
        // reactive state
        let list_data_pemesanan = ref([]);
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
            axios.post(`/order-bahan-baku/list`, data_perpage)
            .then((result) => {
                list_data_pemesanan.value = result.data
                currentPage.value = page; 
                total.value = result.data.total;
            }).catch((err) => {
                console.log(err.response)
            });
        }

        return {
            list_data_pemesanan,
            data_perpage,
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
