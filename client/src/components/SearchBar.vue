<template>
    <div class="search-bar">
        <input 
        type="text" 
        v-model="keyword" 
        placeholder="Search..." 
        @keyup.enter="validateAndSearch"
        />
        <button @click="validateAndSearch">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
</template>

<script>
    export default {
        data() {
        return {
            keyword: ''
        };
        },
        methods: {
        validateAndSearch() {            
            if (this.keyword.trim() && this.keyword.length > 2) {
                this.$emit('getKeyword', this.keyword.trim());
            }
        }
        }
    };
</script>