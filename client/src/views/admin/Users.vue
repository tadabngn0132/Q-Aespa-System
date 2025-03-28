<template>
    <div class="users-container">
        <div class="user-title-create-btn">
            <h1 class="user-title">Users</h1>
            <router-link to="CreateUser" class="create-btn">
                <span>
                    Create User
                </span>
            </router-link>
        </div>

        <ul 
        v-if="users.length > 0" 
        class="users-list">
            <li
            v-for="(user, i) in users" 
            :key="i"
            class="users">
                <router-link class="user-name" :to="{name: 'AdminUserDetail', params: { id: user._id }}">
                    {{ user.name }}
                </router-link>

                <div class="ud-btn-container">
                    <div class="ud-btn">
                        <router-link 
                        class="edit-btn" 
                        :to="{name: 'UpdateUser', params: { id: user._id }}">
                        <span class="icon">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </span>    
                        <span class="text">
                                Edit
                            </span>
                        </router-link>
                    </div>
    
                    <div class="ud-btn" @click.prevent="onDelete(user._id)">
                        <a class="delete-btn" :href="`/users/${user._id}`">
                            <span class="icon">
                                <i class="fa-solid fa-trash"></i> 
                            </span>
                            <span class="text">
                                Delete
                            </span>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="no-users">
            No users found
        </div>
    </div>
</template>

<script>
import exportApis from '@/helpers/api/exportApis';

export default {
    name: 'AdminUsers',
    data() {
        return {
            users: []
        }
    },
    methods: {
        async onDelete(id) {
            const sure = window.confirm('Do you really want to delete this user!');
            if (!sure) return;
            await exportApis.users.deleteUser(id);
            this.$showMessage.success('User deleted successfully!');
            const newUsers = this.users.filter(user => user._id !== id);
            this.users = newUsers;
        }
    },
    async mounted() {
        this.users = await exportApis.users.getUsers();
    }
}
</script>

<style scoped>
.users-container {
    width: 100%;
    margin: 0;
    padding: 1em;
    font-family: Arial, sans-serif;
    color: #333;
}

.user-title-create-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 0.01em solid #3498db;
    padding-bottom: 15px;
    width: 100%;
}

.user-title {
    font-size: 28px;
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
}

.create-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    color: inherit;
}

.create-btn span {
    background-color: #3498db;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: 500;
    transition: background-color 0.3s;
}

.create-btn span:hover {
    background-color: #2980b9;
}

.users-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.users {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    transition: background-color 0.2s;
}

.users:hover {
    background-color: #f8f9fa;
}

.users:last-child {
    border-bottom: none;
}

.users > span {
    font-weight: 500;
    text-align: left;
    flex-grow: 1;
}

.ud-btn-container {
    display: flex;
    flex-direction: row;
}

.ud-btn {
    margin-left: 10px;
}

.edit-btn, .delete-btn {
    display: inline-block;
    padding: 8px 15px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.edit-btn {
    background-color: #f39c12;
    color: white;
}

.edit-btn:hover {
    background-color: #e67e22;
}

.delete-btn {
    background-color: #e74c3c;
    color: white;
}

.delete-btn:hover {
    background-color: #c0392b;
}

.icon {
    margin-right: 0.25em;
}

.text, .icon i {
    font-size: 14px;
    color: #fff;
}

.no-users {
    text-align: center;
    padding: 30px;
    font-size: 18px;
    color: #7f8c8d;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Adding responsiveness */
@media (max-width: 600px) {
    .users {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    }
    
    .ud-btn {
        margin-left: 0;
        margin-top: 5px;
    }
    
    .user-title-create-btn {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .create-btn {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>