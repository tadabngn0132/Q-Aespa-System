<template>
    <div class="ask-question-container">
        <h1>Ask a new question</h1>
        <question-form 
        @createOrUpdate="createOrUpdate"
        :tags="tags"></question-form>
    </div>
</template>

<script>
    import QuestionForm from '@/components/QuestionForm.vue';
    import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'studentAskQuestion',
        components: {
            'question-form': QuestionForm
        }, 
        data() {
            return {
                tags: []
            }
        },
        async mounted() {
            this.tags = await exportApis.tags.getTags();
        },
        methods: {
            createOrUpdate: async function(question) {
                const res = await exportApis.questions.createQuestion(question);
                alert('Question created successfully!');
                this.$router.push(`/admin/questions/${res._id}`);
            }
        }
    };
</script>