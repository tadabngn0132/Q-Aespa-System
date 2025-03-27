<template>
    <div class="user-profile">
        <div class="user-info">
            <h1>{{ currentUser && currentUser.name }}</h1>
            <p>{{ currentUser && currentUser.email }}</p>
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
                <ul v-if="userQuestions && userQuestions.length > 0" class="questions-list">
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
                <ul v-if="userAnswers && userAnswers.length > 0" class="answers-list">
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
                this.userQuestions = [];
            }
        },
        async fetchUserAnswers() {
            try {
                if (this.currentUser && this.currentUser.userId) {
                    this.userAnswers = await exportApis.answers.getAnswersByUserId(this.currentUser.userId);
                }
            } catch (error) {
                console.error("Error fetching user answers:", error);
                this.userAnswers = [];
            }
        }
    },
    created() {
        if (this.currentUser) {
            this.fetchUserQuestions();
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
    }
}
</script>

<style scoped>
.user-profile {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Arial, sans-serif;
}

.user-info {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
}

.user-info h1 {
    font-size: 28px;
    margin-bottom: 8px;
    color: #333;
}

.user-info p {
    color: #666;
    font-size: 16px;
}

.category-nav {
    margin-bottom: 25px;
}

.category-items-list {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #e0e0e0;
}

.category-items {
    padding: 12px 25px;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    transition: all 0.3s ease;
    font-weight: 500;
    color: #555;
}

.category-items:hover {
    background-color: #f5f5f5;
    color: #3498db;
}

.category-items.active {
    background-color: #e1f0ff;
    border-bottom: 3px solid #3498db;
    font-weight: 600;
    color: #3498db;
}

.questions-container, .answers-container {
    animation: fadeIn 0.3s ease-in-out;
    padding: 10px 0;
}

.questions-container h2, .answers-container h2 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
    border-left: 4px solid #3498db;
    padding-left: 15px;
    text-align: left;
}

.questions-list, .answers-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.question-item, .answer-item {
    text-align: left;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
}

.question-item:hover, .answer-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-left: 3px solid #3498db;
}

.question-item a {
    font-size: 18px;
    color: #2980b9;
    text-decoration: none;
    font-weight: 600;
    margin-bottom: 10px;
    display: block;
    transition: color 0.2s;
}

.question-item a:hover {
    color: #3498db;
    text-decoration: underline;
}

.question-item p, .answer-item p {
    margin: 10px 0;
    color: #555;
    line-height: 1.6;
    font-size: 15px;
}

.answer-item {
    background-color: #f0f7fb;
    border-left: 3px solid #76c7e9;
}

.answer-item:hover {
    border-left: 3px solid #3498db;
}

.answer-item a {
    display: inline-block;
    background-color: #e1f0ff;
    color: #3498db;
    padding: 6px 12px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    margin-top: 10px;
    transition: all 0.2s;
}

.answer-item a:hover {
    background-color: #3498db;
    color: white;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .category-items {
        padding: 10px 15px;
        font-size: 14px;
    }
    
    .question-item, .answer-item {
        padding: 15px;
    }
    
    .question-item a {
        font-size: 16px;
    }
}

.questions-container > p, .answers-container > p {
    text-align: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    color: #6c757d;
    font-style: italic;
}
</style>