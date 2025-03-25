<template>
    <div class="admin-tag-detail">
        <h1 class="tag-name">#{{ tag.name }}</h1>
        <p class="tag-description">{{ tag.description }}</p>

        <span v-if="questionCount > 1" class="question-count">
            {{ questionCount }} questions
        </span>

        <span v-if="questionCount <= 1" class="question-count">
            {{ questionCount }} question
        </span>

        <ul class="questions-list">
            <li 
            v-for="(question, i) in questions"
            :key="i" 
            class="questions">
                <router-link :to="{name: 'AdminQuestionDetail', params: { id: question._id}}" class="question-title">
                    {{ question.title }}
                </router-link>

                <p class="question-description">
                    {{ getTruncatedDecripition(question.description) }}
                </p>

                <ul class="question-tags-list">
                    <li
                    v-for="(questionTag, j) in question.tags"
                    :key="j" 
                    class="question-tags">
                        <router-link :to="{name: 'tagDetail', params: { id: questionTag._id}}" class="question-tag">
                            {{ questionTag.name }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'tagDetail',
        data() {
            return {
                tag: {},
                questions: [],
                questionCount: 0
            }
        },
        async mounted() {
            this.fetchData();
        },
        methods: {
            async fetchData() {
                this.tag = await exportApis.tags.getTag(this.$route.params.id);
                this.questions = await exportApis.questions.getQuestionsByTagId(this.$route.params.id);
                this.questionCount = this.questions.length;
            },
            getTruncatedDecripition: function(description) {
                if (description && description.length > 175) {
                    return description.substring(0, 175) + '...';
                }
                return description;
            }
        },
        watch: {
            '$route.params.id': function() {
                this.fetchData();
            }
        }
    }
</script>

<style scoped>
.admin-tag-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
}

.tag-name {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 10px;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
}

.tag-description {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.5;
}

.question-count {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-bottom: 20px;
}

.questions-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.questions {
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 20px;
    text-align: left;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.questions:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.question-title {
    font-size: 1.4rem;
    color: #2c3e50;
    text-decoration: none;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
    transition: color 0.2s;
}

.question-title:hover {
    color: #3498db;
}

.question-description {
    font-size: 1rem;
    color: #555;
    margin-bottom: 15px;
    line-height: 1.5;
}

.question-tags-list {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.question-tags {
    margin-right: 10px;
    margin-bottom: 5px;
}

.question-tag {
    display: inline-block;
    background-color: #e9f4fd;
    color: #3498db;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.85rem;
    text-decoration: none;
    border: 1px solid #cce5ff;
    transition: all 0.2s;
}

.question-tag:hover {
    background-color: #3498db;
    color: white;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .tag-name {
        font-size: 1.8rem;
    }
    
    .question-title {
        font-size: 1.2rem;
    }
    
    .questions {
        padding: 15px;
    }
}
</style>