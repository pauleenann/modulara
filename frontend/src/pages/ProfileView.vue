<script setup>
    import { authStore } from '@/store/authStore';
    import { useRouter } from 'vue-router';

    const auth = authStore();
    const router = useRouter();
</script>

<template>
    <div>
        <button
        @click="auth.logout(router)">
            Logout
        </button>
    </div>
</template>