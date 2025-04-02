<template>
    <div class="search-bar">
        <input 
        type="text" 
        v-model="keyword" 
        placeholder="Search..." 
        @keyup.enter="validateAndSearch"
        class="search-input"
        />
        <button @click="validateAndSearch" class="search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        data() {
            return {
                keyword: ''
            };
        },
        methods: {
            validateAndSearch() {            
                if (this.keyword.trim() && this.keyword.length >= 2) {
                    this.$emit('getKeyword', this.keyword.trim());
                }
            }
        }
    };
</script>

<style scoped>
    .search-bar {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .search-input {
        padding: 0.75em 1em;
        border-radius: 1em 0 0 1em;
        box-shadow: rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px;
        border: none;
        outline: none;
    }

    .search-btn {
        padding: 0.75em 1em 0.75em 0.9em;
        border-radius: 0 1em 1em 0;
        box-shadow: rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px;
        border: none;
        cursor: pointer;
    }

    .search-btn:active {
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        transform: scale(0.975);
    }

</style>