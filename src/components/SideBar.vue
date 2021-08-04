<template>
      <!-- Sidebar -->
  <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink"></i>
      </div>
      <div class="sidebar-brand-text mx-3">My Bolu!!</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'dashboard.index' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </router-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Menu Utama
    </div>

    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#dataPemesanan" aria-expanded="true" aria-controls="dataPemesanan">
        <i class="fas fa-cart-arrow-down"></i>
        <span>Data Pemesanan</span>
      </a>
      <div id="dataPemesanan" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Data Pemesanan :</h6>
          <a class="collapse-item" href="../pemesanan">Data Pemesanan</a>
          <a class="collapse-item" href="../pelanggan">Data Pelanggan</a>
        </div>
      </div>
    </li>

    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#dataProduksi" aria-expanded="true" aria-controls="dataProduksi">
        <i class="fas fa-cookie-bite"></i>
        <span>Data Produksi</span>
      </a>
      <div id="dataProduksi" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Data Produksi :</h6>
          <router-link class="collapse-item" :to="{ name: 'produksi.index' }">Produksi</router-link>
          <router-link class="collapse-item" :to="{ name: 'produk.index' }">Produk</router-link>
          <router-link class="collapse-item" :to="{ name: 'resep.index' }">Resep</router-link>
        </div>
      </div>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#basicData" aria-expanded="true" aria-controls="basicData">
        <i class="fas fa-table"></i>
        <span>Basic Data</span>
      </a>
      <div id="basicData" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Bahan Baku :</h6>
          <router-link class="collapse-item" :to="{ name: 'bahanBaku.index' }">Bahan Baku</router-link>
          <router-link class="collapse-item" :to="{ name: 'bahanBaku.listOrder' }">Pemesanan Bahan Baku</router-link>
          <h6 class="collapse-header">Basic Data :</h6>
          <router-link class="collapse-item" :to="{ name: 'satuan.index' }">Type Satuan Barang</router-link>
          <router-link class="collapse-item" :to="{ name: 'suplayer.index' }">Data Suplayer</router-link>
          <router-link class="collapse-item" :to="{ name: 'aset.index' }">Data Asset</router-link>
        </div>
      </div>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#dataKepegawayan" aria-expanded="true" aria-controls="dataKepegawayan">
        <i class="fas fa-users"></i>
        <span>Kepegawaian</span>
      </a>
      <div id="dataKepegawayan" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Data Kariawan :</h6>
          <a class="collapse-item" href="../karyawan">Data Karyawan</a>
          <a class="collapse-item" href="../pengeluaran">Data Pengeluaran</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Utilities
    </div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
        <i class="fas fa-user-cog"></i>
        <span>Data User</span>
      </a>
      <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
          <a class="collapse-item" href="#">Data User</a>
          <a class="collapse-item" href="#">Ganti Password</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>

  </ul>
  <!-- End of Sidebar -->
</template>

<script>
// import {mapGetters} from 'vuex'

export default {
    name: 'SideBar',
    // computed: {
    //     ...mapGetters(['user'])
    // }
}
</script>