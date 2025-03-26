<template>
    <div class="user-profile">
        <div class="user-info">
            <h1>{{ currentUser.name }}</h1>
            <p>{{ currentUser.email }}</p>
        </div>

        <nav class="category-nav">
            <ul class="category-items-list">
                <li 
                    class="category-items" 
                    :class="{ active: activeTab === 'questions' }"
                    @click="activeTab = 'questions'"
                >
                    Questions
                </li>
                <li 
                    class="category-items"
                    :class="{ active: activeTab === 'answers' }"
                    @click="activeTab = 'answers'"
                >
                    Answers
                </li>
            </ul>
        </nav>

        <div class="question-answer">
            <div v-if="activeTab === 'questions'" class="questions-container">
                <h2>Your Questions</h2>
                <ul v-if="userQuestions.length > 0" class="questions-list">
                    <li v-for="(question, i) in userQuestions" :key="i" class="question-item">
                        <router-link :to="{ name: 'StudentQuestionDetail', params: { id: question._id } }">
                            {{ question.title }}
                        </router-link>
                        <p>{{ getTruncatedDescription(question.description) }}</p>
                    </li>
                </ul>
                <p v-else>You haven't asked any questions yet.</p>
            </div>

            <div v-if="activeTab === 'answers'" class="answers-container">
                <h2>Your Answers</h2>
                <ul v-if="userAnswers.length > 0" class="answers-list">
                    <li v-for="(answer, i) in userAnswers" :key="i" class="answer-item">
                        <p>{{ answer.description }}</p>
                        <router-link :to="{ name: 'StudentQuestionDetail', params: { id: answer.questionId } }">
                            View Question
                        </router-link>
                    </li>
                </ul>
                <p v-else>You haven't answered any questions yet.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import exportApis from '@/helpers/api/exportApis';

export default {
    name: 'Profile',
    data() {
        return {
            activeTab: 'questions',
            userQuestions: [],
            userAnswers: []
        }
    },
    computed: {
        ...mapGetters('auth', ['currentUser'])
    },
    methods: {
        getTruncatedDescription(description) {
            if (description && description.length > 100) {
                return description.substring(0, 100) + '...';
            }
            return description;
        },
        async fetchUserQuestions() {
            try {
                if (this.currentUser && this.currentUser.userId) {
                    this.userQuestions = await exportApis.users.getQuestionsByUserId(this.currentUser.userId);
                }
            } catch (error) {
                console.error("Error fetching user questions:", error);
            }
        },
        async fetchUserAnswers() {
            try {
                if (this.currentUser && this.currentUser.userId) {
                    this.userAnswers = await exportApis.answers.getAnswersByUserId(this.currentUser.userId);
                }
            } catch (error) {
                console.error("Error fetching user answers:", error);
            }
        }
    },
    watch: {
        activeTab(newTab) {
            if (newTab === 'questions') {
                this.fetchUserQuestions();
            } else if (newTab === 'answers') {
                this.fetchUserAnswers();
            }
        },
        currentUser(newUser) {
            if (newUser) {
                if (this.activeTab === 'questions') {
                    this.fetchUserQuestions();
                } else if (this.activeTab === 'answers') {
                    this.fetchUserAnswers();
                }
            }
        }
    },
    mounted() {
        if (this.currentUser) {
            if (this.activeTab === 'questions') {
                this.fetchUserQuestions();
            } else if (this.activeTab === 'answers') {
                this.fetchUserAnswers();
            }
        }
    }
}
</script>

<style scoped>
.user-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.user-info {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.category-nav {
    margin-bottom: 20px;
}

.category-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #eee;
}

.category-items {
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    transition: background-color 0.3s;
}

.category-items:hover {
    background-color: #f5f5f5;
}

.category-items.active {
    background-color: #e1f0ff;
    border-bottom: 2px solid #3498db;
    font-weight: bold;
}

.questions-container, .answers-container {
    animation: fadeIn 0.3s ease-in-out;
}

.questions-list, .answers-list {
    list-style-type: none;
    padding: 0;
}

.question-item, .answer-item {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>