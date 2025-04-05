<template>
    <div class="search-bar">
        <div v-if="forTag" class="icon-search-tag-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input
            type="text" 
            v-model="tagname" 
            placeholder="Filter by tag name" 
            @input="handleInputChange"
            class="search-tag-input"
            />
        </div>

        <input 
        v-if="!forTag"
        type="text" 
        v-model="keyword" 
        placeholder="Search..." 
        @keyup.enter="validateAndSearch"
        class="search-input"
        />

        <button v-if="!forTag" @click="validateAndSearch" class="search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'SearchBar',
        props: {
            forTag: {
                type: Boolean,
                required: true
            },
            resetSearch: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                keyword: '',
                tagname: ''
            };
        },
        methods: {
            validateAndSearch() {                
                if (this.keyword.trim()) {
                    if (this.keyword.trim() === this.$route.query.keyword) {
                        console.log('Keyword does not change, skip...');
                        return;
                    }
                    this.$emit('getKeyword', this.keyword.trim());
                }
            },
            handleInputChange() {
                setTimeout(() => {
                    this.$emit('filterTag', this.tagname.trim());
                }, 750);
            }
        },
        watch: {
            '$route.query.keyword': {
                immediate: true,
                handler(newKeyword) {
                    this.keyword = newKeyword;
                }
            },
            resetSearch: {
                immediate: true,
                handler(newVal) {
                    if (newVal === true) {
                        this.tagname = '';
                    }
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

    .icon-search-tag-bar {
        display: flex;
        align-items: center;
        background-color: #fff;
        color: #777;
        border: 0.1em solid #e1e1e1;
        padding: 0.15em 1em 0.15em 0.75em;
        border-radius: 0.75em;
        width: 15em;
        transition: all 0.25s ease-in-out;
    }

    .icon-search-tag-bar i {
        color: inherit;
    }
    
    .search-input {
        padding: 0.65em 1em;
        border-radius: 1em 0 0 1em;
        box-shadow: rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px;
        border: 0.15em solid #333;
        border-right: none;
        outline: none;
    }

    .search-input:focus {
        border: 0.15em solid #8BCAD9;
        border-right: none;
    }

    .search-tag-input {
        padding: 0.65em 1em 0.65em 0.75em;
        border-radius: 1em 1em;
        box-shadow: rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px;
        border: 0.1em solid #fff;
        width: 100%;
        outline: none;
    }

    .icon-search-tag-bar:has(.search-tag-input:focus) {
        border: 0.1em solid #8BCAD9;
    }

    .search-btn {
        padding: 0.65em 1em 0.65em 0.9em;
        border-radius: 0 1em 1em 0;
        box-shadow: rgba(255, 255, 255, 0.15) 1.95px 1.95px 2.6px;
        border: 0.15em solid #333;
        border-left: none;
        cursor: pointer;
    }

    .search-input:focus ~ .search-btn {
        border: 0.15em solid #8BCAD9;
        border-left: none;
    }

    .search-btn:active {
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        transform: scale(0.975);
    }

</style>