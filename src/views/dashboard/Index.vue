<template>
    <div id="wrapper">
        <SideBar />
        <ContentDashboard />
    </div>
</template>

<script>
import SideBar from "../../components/SideBar.vue";
import ContentDashboard from "../../components/ContentDashboard.vue";

export default {
    components: {
        SideBar,
        ContentDashboard
    }
}
</script>
