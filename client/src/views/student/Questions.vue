<template>
    <div class="questions-container">
        <div class="question-title--create-btn">
            <h1 v-if="questionCount > 1" class="questions-title">Newest Questions</h1>
            <h1 v-else class="questions-title">Newest Question</h1>
            <router-link class="create-btn" to="askquestion">
                Ask Question
            </router-link>
        </div>
        <table class="question-list-cud-btn">
            <thead>
                <tr>
                    <th v-if="questionCount > 1" class="questionCount">
                        {{ questionCount }} questions
                    </th>
                    <th v-else class="questionCount">
                        {{ questionCount }} question
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, i) in questions" :key="i">
                    <td class="question-title-show">
                        <router-link class="to-question-detail" :to="{name: 'StudentQuestionDetail', params: { id: question._id }}">
                            {{ question.title }}
                        </router-link>
                        <p>{{ getTruncatedDescription(question.description) }}</p>
                        <ul class="tags-list" v-if="question.tags && question.tags.length > 0">
                            <li class="tags" v-for="(tag, j) in question.tags" :key="j">
                                <router-link class="tag" :to="{name: 'studentTagDetail', params: { id: tag._id }}">
                                    {{ tag.name }}
                                </router-link>
                            </li>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'StudentQuestions',
        data() {
            return {
                questions: [],
                questionCount: 0,
            };
        },
        methods: {
            getTruncatedDescription(description) {
                if (description && description.length > 175) {
                    return description.substring(0, 175) + '...';
                }
                return description;
            },
            async onDelete(id) {
                const sure = window.confirm('Do you really want to delete this question?');
                if (!sure) return;
                await exportApis.questions.deleteQuestion(id);
                this.flash('Question deleted successfully!', 'success');
                const newQuestions = this.questions.filter(question => question._id !== id);
                this.questions = newQuestions;
                this.questionCount = this.questions.length;
            }
        },
        async mounted() {
            this.questions = await exportApis.questions.getQuestions();
            this.questionCount = this.questions.length;
        }
    }
</script>

<style scoped>
    .questions-container {
        margin: 0;
        padding: 0 1em;
    }

    .question-title--create-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .questions-container .question-title--create-btn .questions-title {
        text-align: left;
        font-weight: normal;
    }

    .questions-container .question-title--create-btn .create-btn {
        background-color: #4BACB8;
        color: #fff;
        padding: 0.75em 1.5em;
        border-radius: 0.5em;
    }

    .questions-container .question-title--create-btn .create-btn:hover {
        background-color: #3A8F9A;
    }

    .questions-container .question-list-cud-btn {
        width: 100%;
        border-collapse: collapse;
        text-align: justify;
    }

    .questions-container .question-list-cud-btn
    thead tr th , .questions-container .question-list-cud-btn
    tbody tr td {
        color: #333;
        padding: 1em 0;
        border-bottom: 1px solid #d2d2d2;
    }
    .questions-container .question-list-cud-btn
    thead tr th:first-child {
        font-weight: normal;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
        width: 100%;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list {
        list-style-type: none;
        display: flex;
        align-items: center;
        gap: 0.75em;
        margin-top: 0.5em;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list 
    li.tags {
        transition: all 0.3s ease-in-out;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list 
    li.tags:hover {
        transform: translateY(-3px);
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list 
    li.tags .tag {
        background-color: #e0e0e0;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: 13.5px;
        font-weight: bold;
        color: #444;
    }
    
    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show .to-question-detail {
        font-size: 18px;
        color: #1B75D0;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show 
    .to-question-detail:hover {
        color: #155BA0;
    }
</style>