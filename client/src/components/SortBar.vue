<template>
    <div class="sort-bar-container">
        <ul class="sort-items-list">
            <li 
            v-for="sortType in ['Newest', 'Oldest', 'Unanswered', 'Score']" 
            :key="sortType"
            :class="['sort-items', { active: activeSort === sortType }]"
            @click="setSort(sortType)"
            >
                {{ sortType }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: SortBar
    }
</script>

<style scoped>
.sort-bar-container {
    margin: 1rem 0;
    padding: 0.5rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sort-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
}

.sort-items {
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
    transition: all 0.2s ease;
}

.sort-items:hover {
    background-color: #f0f0f0;
    color: #333;
}

.sort-items.active {
    background-color: #4BACB8;
    color: white;
    border-color: #4BACB8;
}

@media (max-width: 768px) {
    .sort-items-list {
        flex-wrap: wrap;
    }
    
    .sort-items {
        flex-grow: 1;
        text-align: center;
    }
}
</style>