<template>
    <div class="questions-container">
        <h1 v-if="questionCount > 1" class="questions-title">Newest Questions</h1>
        <h1 v-else class="questions-title">Newest Question</h1>
        <table class="question-list-cud-btn">
            <thead>
                <tr>
                    <th v-if="questionCount > 1" class="questionCount">
                        {{ questionCount }} questions
                    </th>
                    <th v-else class="questionCount">
                        {{ questionCount }} question
                    </th>
                    <th colspan="2">
                        <router-link class="create-btn" to="askQuestion">
                            Ask Question
                        </router-link>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, i) in questions" :key="i">
                    <td class="question-title-show">
                        <router-link class="to-question-detail" :to="{name: 'AdminQuestionDetail', params: { id: question._id }}">
                            {{ question.title }}
                        </router-link>
                        <p>{{ getTruncatedDescription(question.description) }}</p>
                        <ul class="tags-list" v-if="question.tags && question.tags.length > 0">
                            <li class="tags" v-for="(tag, j) in question.tags" :key="j">
                                <router-link class="tag" :to="{name: 'tagDetail', params: { id: tag._id }}">
                                    {{ tag.name }}
                                </router-link>
                            </li>
                        </ul>
                    </td>
                    <td class="ud-btn-container">
                        <router-link class="ud-btn edit-btn" :to="{name: 'editQuestion', params: { id: question._id }}">
                            <span class="icon">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </span>
                            <span class="text">
                                Edit
                            </span>
                        </router-link>
                    </td>
                    <td class="ud-btn-container" @click.prevent="onDelete(question._id)">
                        <a class="ud-btn delete-btn" :href="`/questions/${question._id}`">
                            <span class="icon">
                                <i class="fa-solid fa-trash"></i>
                            </span>
                            <span class="text">
                                Delete
                            </span>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'AdminQuestions',
        data() {
            return {
                questions: [],
                questionCount: 0,
            };
        },
        methods: {
            getTruncatedDescription(description) {
                if (description && description.length > 140) {
                    return description.substring(0, 140) + '...';
                }
                return description;
            },
            async onDelete(id) {
                const sure = window.confirm('Do you really want to delete this question?');
                if (!sure) return;
                await exportApis.questions.deleteQuestion(id);
                alert('Question deleted successfully!');
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

    .questions-container .questions-title {
        text-align: left;
        font-weight: normal;
    }

    .questions-container .question-list-cud-btn {
        width: 100%;
        border-collapse: collapse;
        text-align: justify;
    }

    .questions-container .question-list-cud-btn
    thead tr , .questions-container .question-list-cud-btn
    tbody tr {
        border-bottom: 0.01em solid #d2d2d2;
    }

    .questions-container .question-list-cud-btn
    thead tr th , .questions-container .question-list-cud-btn
    tbody tr td {
        color: #333;
        padding: 1em 0;
    }

    .questions-container .question-list-cud-btn
    thead tr th , .questions-container .question-list-cud-btn
    tbody tr td:first-child {
        margin-right: 1em;
    }

    .questions-container .question-list-cud-btn
    thead tr th:first-child {
        font-weight: normal;
    }

    .questions-container .question-list-cud-btn
    thead tr th:last-child {
        text-align: right;
        font-weight: normal;
    }

    .questions-container .question-list-cud-btn
    thead tr th .create-btn {
        background-color: #4BACB8;
        color: #fff;
        padding: 0.75em 1.5em;
        border-radius: 0.75em;
    }

    .questions-container .question-list-cud-btn
    thead tr th .create-btn:hover {
        background-color: #3A8F9A;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show {
        display: flex;
        flex-direction: column;
        gap: 0.4em;
    }
    
    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show .to-question-detail {
        font-size: 18px;
        color: #1B75D0;
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
    li.tags .tag {
        background-color: #e0e0e0;
        padding: 0.25em 0.5em;
        border-radius: 0.25em;
        font-size: 13.5px;
        font-weight: bold;
        color: #444;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list 
    li.tags:hover {
        transform: translateY(-3px);
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show ul.tags-list 
    li.tags .tag:hover {
        background-color: #d0d0d0;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.question-title-show 
    .to-question-detail:hover {
        color: #155BA0;
    }
    
    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container {
        width: 7.5em;
        text-align: center;
        margin: 0;
        padding: 0;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn {
        background-color: #F9A826;
        color: #fff;
        padding: 0.75em 1.25em;
        border-radius: 0.5em;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn:hover {
        background-color: #E8950F;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn.delete-btn {
        background-color: #E57373;
        color: #fff;
    }
    
    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn.delete-btn:hover {
        background-color: #D32F2F;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn
    span, .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn i {
        color: inherit;
    }

    .questions-container .question-list-cud-btn
    tbody tr td.ud-btn-container .ud-btn
    span:first-child {
        margin-right: 0.25em;
    }

    @media screen and (max-width: 1024px) {
        .questions-container .question-list-cud-btn
        tbody tr td.ud-btn-container {
            width: 4.5em;
        }
        
        .questions-container .question-list-cud-btn
        tbody tr td.ud-btn-container .ud-btn {
            padding: 1em 1.1em;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
        }
        
        .questions-container .question-list-cud-btn
        tbody tr td.ud-btn-container .ud-btn:hover {
            font-size: larger;
        }
        
        .questions-container .question-list-cud-btn
        tbody tr td.ud-btn-container .ud-btn
        span.text {
            display: none;
        }

        .questions-container .question-list-cud-btn
        tbody tr td.ud-btn-container .ud-btn
        span:first-child {
            margin-right: 0;
        }
    }
</style>