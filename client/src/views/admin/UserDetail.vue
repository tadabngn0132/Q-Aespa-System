<template>
    <div class="user-detail-container">
        <div class="user-detail">
            <h1 class="user-name">{{ user.name }}</h1>
            <p class="user-email">{{ user.email }}</p>
        </div>
    </div>
</template>

<script>
import exportApis from '@/helpers/api/exportApis';

export default {
    name: 'AdminUserDetail',
    data() {
        return {
            user: ''
        }
    },
    async mounted() {
        this.user = await exportApis.users.getUser(this.$route.params.id)
    }
}
</script>