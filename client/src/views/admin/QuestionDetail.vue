<template>
    <div class="admin-question-detail">
        <div class="question-title-create-btn">
            <h1>{{ question.title }}</h1>
            <router-link class="create-btn" :to="{name: 'askQuestion'}">
                Ask Question
            </router-link>
        </div>

        <div class="asked-modified-date-time">
            <p>Asked {{ formatDate(question.createdAt) }}</p>
            <p>Modified {{ formatDate(question.updatedAt) }}</p>
        </div>

        <div class="question-description">
            {{ question.description }}
        </div>

        <ul class="tags-list" v-if="question.tags && question.tags.length > 0">
            <li class="tags" v-for="(tag, i) in question.tags" :key="i">
                <router-link :to="{ name: 'tagDetail', params: { id: tag._id }}" class="tag">
                    {{ tag.name }}
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
        name: 'AdminQuestionDetail',
        components: {
            'answers': Answers
        },
        data () {
            return {
                question: {
                    _id: '',
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
            }
        },
        async mounted() {
            this.question = await exportApis.questions.getQuestion(this.$route.params.id);

        }
    }
</script>

<style scoped>
    .admin-question-detail {
        max-width: 50em;
        margin: 0 auto;
        padding: 1.25em;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333;
    }

    .admin-question-detail .question-title-create-btn {
        display: flex;
        align-items: center;
        padding-bottom: 1em;
    }

    .admin-question-detail .question-title-create-btn h1 {
        font-size: 24px;
        font-weight: 450;
        margin: 0;
        color: #1a1a1a;
        text-align: left;
    }

    .admin-question-detail .question-title-create-btn .create-btn {
        background-color: #1B75D0;
        color: #fff;
        width: 35%;
        padding: 0.5em 1em;
        border-radius: 0.5em;
        transition: background-color 0.2s ease;
    }

    .admin-question-detail .question-title-create-btn .create-btn:hover {
        background-color: #155BA0;
    }

    .admin-question-detail .asked-modified-date-time {
        display: flex;
        gap: 1.5em;
        font-size: 13.5px;
        color: #666;
        margin-bottom: 1.25em;
        padding-bottom: 1em;
        border-bottom: 0.075em solid #e0e0e0;
    }

    .admin-question-detail .asked-modified-date-time p {
        margin: 0;
    }

    .admin-question-detail .question-description {
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 25px;
        text-align: left;
    }

    .admin-question-detail .tags-list {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin: 0;
        gap: 0.5em;
    }

    .admin-question-detail .tags-list .tags {
        margin: 0;
        transition: all 0.3s ease-in-out;
    }

    .admin-question-detail .tags-list .tags:hover {
        transform: translateY(-3px);
    }

    .admin-question-detail .tags-list .tags .tag {
        padding: 0.25em 0.75em;
        background-color: #e1ecf4;
        color: #39739d;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s ease;
    }

    .admin-question-detail .tags-list .tags .tag:hover {
        background-color: #d0e3f1;
        color: #2c5877;
    }

    @media (max-width: 768px) {
        .admin-question-detail .question-title-create-btn {
            align-items: flex-start;
            gap: 0.5em;
        }

        .admin-question-detail .asked-modified-date-time {
            gap: 1em;
        }
    }
</style>