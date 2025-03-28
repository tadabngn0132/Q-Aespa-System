<template>
    <div class="student-question-detail">
        <div class="question-title-create-btn">
            <h1>{{ question.title }}</h1>
            <router-link class="create-btn" :to="{name: 'studentAskQuestion'}">
                Ask Question
            </router-link>
        </div>
        
        <div class="asked-modified-date-time">
            <div class="date-time">
                <p>Asked {{ formatDate(question.createdAt) }}</p>
                <p>Modified {{ formatDate(question.updatedAt) }}</p>
            </div>
            <div v-if="canEditOrDeleteQuestion(question)" class="ud-btn-container">
                <div class="ud-btn">
                    <router-link class="edit-btn" :to="{name: 'studentEditQuestion', params: { id: question._id }}">
                        <span class="icon">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </span>
                        <span class="text">
                            Edit
                        </span>
                    </router-link>
                </div>
                <div class="ud-btn" @click.prevent="onDelete(question._id)">
                    <a class="delete-btn" :href="`/questions/${question._id}`">
                        <span class="icon">
                            <i class="fa-solid fa-trash"></i>
                        </span>
                        <span class="text">
                            Delete
                        </span>
                    </a>
                </div>
            </div>
        </div>


        <div class="question-description">
            {{ question.description }}
        </div>

        <ul class="tags-list" v-if="question.tags && question.tags.length > 0">
            <li class="tags" v-for="(tag, i) in question.tags" :key="i">
                <router-link :to="{ name: 'studentTagDetail', params: { id: tag._id }}" class="tag">
                    {{ tag.name || 'No' }}
                </router-link>
            </li>
        </ul>

        <answers
        :question="question"></answers>
    </div>
</template>

<script>
    import Answers from '@/components/Answers.vue';
    import exportApis from '@/helpers/api/exportApis';
    import dayjs from 'dayjs';
    import relativeTime from 'dayjs/plugin/relativeTime';

    dayjs.extend(relativeTime);

    export default {
        name: 'StudentQuestionDetail',
        components: {
            'answers': Answers
        },
        data () {
            return {
                question: {
                    title: '',
                    description: '',
                    createdAt: '',
                    updatedAt: '',
                    tags: []
                }
            }
        }, 
        methods: {
            formatDate(timestamp) {
                return dayjs(timestamp).format('DD/MM/YYYY')
            },

            formatRelativeTime(timestamp) {
                return dayjs(timestamp).fromNow();
            },
            canEditOrDeleteQuestion(question) {
                const currentUserId = this.$store.state.auth.userId;
                return currentUserId && question.userId === currentUserId;
            },
            async onDelete(id) {
                const sure = window.confirm('Do you really want to delete this question?');
                if (!sure) return;
                await exportApis.questions.deleteQuestion(id);
                this.$showMessage.success('Question deleted successfully!');
                this.$router.push('/student/questions');
            }
        },
        async mounted() {
            this.question = await exportApis.questions.getQuestion(this.$route.params.id);
        }
    }
</script>

<style scoped>
    .student-question-detail {
        max-width: 50em;
        margin: 0 auto;
        padding: 1.25em;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
    }

    .student-question-detail .question-title-create-btn {
        display: flex;
        align-items: center;
        padding-bottom: 1em;
    }

    .student-question-detail .question-title-create-btn h1 {
        font-size: 24px;
        font-weight: 600;
        margin: 0;
        color: #1a1a1a;
        text-align: left;
    }

    .student-question-detail .question-title-create-btn .create-btn {
        background-color: #0077cc;
        color: white;
        font-weight: 500;
        width: 35%;
        padding: 0.5em 1em;
        border-radius: 8px;
        transition: background-color 0.2s ease;
    }

    .student-question-detail .question-title-create-btn .create-btn:hover {
        background-color: #0055aa;
    }

    .student-question-detail .asked-modified-date-time {
        display: flex;
        align-items: center;
        gap: 1.5em;
        font-size: 14px;
        color: #666;
        justify-content: space-between;
        margin-bottom: 1.25em;
        padding-bottom: 1em;
        border-bottom: 0.075em solid #e0e0e0;
    }

    .student-question-detail .date-time {
        display: flex;
        align-items: center;
        gap: 1.5em;
        font-size: 14px;
        color: #666;
    }

    .student-question-detail .asked-modified-date-time p {
        margin: 0;
    }

    .student-question-detail .question-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
        text-align: left;
    }

    .student-question-detail .tags-list {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin: 0;
        gap: 0.5em;
    }

    .student-question-detail .tags-list .tags {
        margin: 0;
    }

    .student-question-detail .tags-list .tags .tag {
        padding: 0.25em 0.75em;
        background-color: #e1ecf4;
        color: #39739d;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s ease;
    }

    .student-question-detail .tags-list .tags .tag:hover {
        background-color: #d0e3f1;
        color: #2c5877;
    }

    .ud-btn-container {
        display: flex;
        gap: 1em;
        width: max-content;
        margin-bottom: 0.25em;
        padding: 0;
    }

    .ud-btn-container .ud-btn {
        transition: all 0.3s ease-in-out;
    }

    .ud-btn-container .edit-btn {
        background-color: #F9A826;
        color: #fff;
        padding: 0.75em 1.25em;
        border-radius: 0.5em;
    }
    .ud-btn-container .edit-btn:hover {
        background-color: #E8950F;
    }
    .ud-btn-container .delete-btn {
        background-color: #E57373;
        color: #fff;
        padding: 0.75em 1.25em;
        border-radius: 0.5em;
    }
    .ud-btn-container .delete-btn:hover {
        background-color: #D32F2F;
    }
    .ud-btn-container .ud-btn
    span,
    .ud-btn-container .ud-btn i {
        color: inherit;
    }
    .ud-btn-container
    span:first-child {
        margin-right: 0.25em;
    }

    @media screen and (max-width: 1024px) {        
        .ud-btn-container .edit-btn,
        .ud-btn-container .delete-btn {
            padding: 0.8em 1em;
            border-radius: 50%;
            transition: all 0.3s ease-in-out;
        }
        
        .ud-btn-container .ud-btn:hover {
            transform: translateY(-4px);
        }
        
        .ud-btn-container .ud-btn
        span.text {
            display: none;
        }

        .ud-btn-container .ud-btn
        span:first-child {
            margin-right: 0;
        }
    }

    @media (max-width: 768px) {
        .student-question-detail .question-title-create-btn {
            align-items: flex-start;
            gap: 0.5em;
        }

        .student-question-detail .asked-modified-date-time {
            gap: 1em;
        }
    }
</style>