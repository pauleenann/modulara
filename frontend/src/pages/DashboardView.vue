<script setup>
    import AdminNavbar from '@/components/Admin/AdminNavbar.vue';
import AdminSidebar from '@/components/Admin/AdminSidebar.vue';

</script>

<template>
    <div id="dashboard">
        <!-- navbar -->
        <AdminSidebar/>

        <!-- view -->
        <div class="bg-white w-full h-full rounded-xl overflow-hidden">
            <AdminNavbar/>
        </div>
    </div>
</template>