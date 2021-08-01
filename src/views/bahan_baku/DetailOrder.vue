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
                        <h1 class="h3 mb-0 text-dark">Order Bahan Baku Detail</h1>
                        <!-- <div class="col-2"> -->
                            <router-link 
                                :to="{ name: 'bahanBaku.listOrder' }"
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
                                        <div class="card-body" v-if="order_bahan_baku">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Nomor Order</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.nomor_order}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Tanggal Order</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.tanggal_order}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Suplayer</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.nama_suplayer}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Total Item</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.total_item}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Jumlah Harga Total</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.jumlah_total}}</div>
                                            </div>
                                            <hr class="sidebar-divider">
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Created By</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.created_by}}</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-4 text-white-50 small">Created At</div>
                                                <div class="col-sm-1 text-white-50 small"> : </div>
                                                <div class="col-sm-7" v-if="order_bahan_baku">{{order_bahan_baku.data.created_at}}</div>
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
                                    <h6 class="m-0 font-weight-bold text-primary">Item Bahan Baku</h6>
                                </div>
                                <!-- Card Body -->
                                <div class="card-body">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Nama Bahan Baku</th>
                                            <th>Harga Satuan</th>
                                            <th>Jumlah</th>
                                            <th>Sub Total</th>
                                            <!-- <th class="align-middle"></th> -->
                                        </tr>
                                        </thead>
                                        <tbody  v-if="order_bahan_baku" >
                                        <tr v-for="(detail, index) in order_bahan_baku.list_items" :key="index">
                                            <td class="align-middle">{{ detail.nama_bahan_baku }}</td>
                                            <td class="align-middle">{{ detail.harga_satuan }}</td>
                                            <td class="align-middle">{{ detail.jumlah_pesanan }} {{ detail.simbol_satuan }}</td>
                                            <td class="align-middle">{{ detail.jumlah_pesanan * detail.harga_satuan }}</td>
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
        // reactive state
        let order_bahan_baku = ref();
        const route = useRoute();

        onMounted(() => {
            getData();
        });

        function getData() {
            axios.get(`order-bahan-baku/${route.params.id}`)
            .then((res) => {
                order_bahan_baku.value = res.data
            }).catch((err) => {
                console.log(err.response)
            });
        }

        return {
            order_bahan_baku,
            getData
        }
    },
}
</script>
