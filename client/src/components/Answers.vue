<template>
    <div class="answers-container">
        <span v-if="answerCount > 1" class="answer-count">
            {{ answerCount }} answers
        </span>

        <span v-if="answerCount <= 1" class="answer-count">
            {{ answerCount }} answer
        </span>
        
        
        <ul 
            v-if="answers.length > 0" 
            class="answers-list">
                <li
                v-for="(answer, i) in answers"
                :key="i" 
                class="answers">
                <span class="answer-description">
                    {{ answer.description }}
                </span>
                <div class="ud-btn" v-if="canEditAnswer(answer)">
                    <button class="edit-btn" @click="startEdit(answer)">Edit</button>
                    <button class="delete-btn" @click="deleteAnswer(answer._id)">Delete</button>
                </div>
            </li>
        </ul>

    <answer-form
    @createOrUpdate="createOrUpdate"
    :answer="editingAnswer"></answer-form>
    </div>
</template>

<script>
import exportApis from '@/helpers/api/exportApis';
import AnswerForm from './AnswerForm.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Answers',
    components: {
        'answer-form': AnswerForm
    },
    props: {
        question: {
            type: Object,
            required: true,
            default: () => {
                return {
                    _id: '',
                    title: '',
                    description: '',
                    createdAt: '',
                    updatedAt: '',
                    tags: []
                }
            }
        }
    },
    computed: {
        ...mapGetters('auth', ['userRole'])
    },
    data() {
        return {
            answers: [],
            answerCount: 0,
            editingAnswer: {}
        }
    },
    methods: {
        startEdit(answer) {
            this.editingAnswer = { ...answer };
        },
        async createOrUpdate(answer) {
            const userId = this.$store.state.auth.userId;

            if (!userId) {
                alert('You must be logged in to create or edit answers');
                return;
            }

            const answerwithUserId = {
                ...answer,
                userId: userId
            };

            if (answer._id) {
                await exportApis.answers.updateAnswer(this.question._id, answer._id, answerwithUserId);
                alert('Answer updated successfully!');
            } else {
                await exportApis.answers.createAnswer(this.question._id, answerwithUserId);
                alert('Answer created successfully!');
            }
            this.answers = await exportApis.answers.getAnswers(this.question._id);
            this.answerCount = this.answers.length;
            this.editingAnswer = {};
        },
        async deleteAnswer(answerId) {
            const sure = window.confirm('Do you really want to delete this answer?');
            if (sure) {
                await exportApis.answers.deleteAnswer(this.question._id, answerId);
                this.answers = await exportApis.answers.getAnswers(this.question._id);
                this.answerCount = this.answers.length;
            }
        },
        canEditAnswer(answer) {
            if (this.userRole === 'admin') {
                return true;
            }

            const currentUserId = this.$store.state.auth.userId;
            return currentUserId && answer.userId === currentUserId;
        }
    },
    watch: {
        'question._id': {
            immediate: true,
            async handler(newId) {
                if (newId) {
                    this.answers = await exportApis.answers.getAnswers(newId);
                    this.answerCount = this.answers.length;
                }
            }
        }
    }
}
</script>

<style scoped>
.answers-container {
    width: 100%;
    text-align: left;
    margin: 1.5em 0 0;
    padding: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    color: #333;
}

.answer-count {
    display: block;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 8px;
}

.answers-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.answers {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 18px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-left: 4px solid #3498db;
}

.answers:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.answer-description {
    flex: 1;
    word-break: break-word;
    line-height: 1.5;
}

.ud-btn {
    display: flex;
    gap: 8px;
    margin-left: 15px;
}

.edit-btn, .delete-btn {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 14px;
}

.edit-btn {
    color: #2196F3;
    border-color: #2196F3;
}

.edit-btn:hover {
    background-color: #2196F3;
    color: white;
}

.delete-btn {
    color: #F44336;
    border-color: #F44336;
}

.delete-btn:hover {
    background-color: #F44336;
    color: white;
}

@media (max-width: 768px) {
    .answers {
        flex-direction: column;
        align-items: flex-start;
        padding: 15px;
    }
    
    .ud-btn {
        margin-top: 15px;
        margin-left: 0;
        width: 100%;
    }
    
    .edit-btn, .delete-btn {
        flex: 1;
        text-align: center;
    }
}

/* Adding styles for AnswerForm component integration */
answer-form {
    margin-top: 30px;
    display: block;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>