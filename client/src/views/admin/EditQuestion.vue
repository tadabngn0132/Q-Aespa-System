<template>
    <div class="edit-question-container">
        <h1>Edit Question</h1>
        <question-form 
        @createOrUpdate="createOrUpdate"
        :question="question"
        :tags="tags"></question-form>
    </div>
</template>

<script>
    import QuestionForm from '@/components/QuestionForm.vue';
    import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'editQuestion',
        components: {
            'question-form': QuestionForm
        },
        data() {
            return {
                question: {},
                tags: []
            };
        },
        async mounted() {
            this.question = await exportApis.questions.getQuestion(this.$route.params.id);
            this.tags = await exportApis.tags.getTags();
        },
        methods: {
            createOrUpdate: async function(question) {
                await exportApis.questions.updateQuestion(question);
                alert('Question updated successfully!');
                this.$router.push(`/admin/questions/${question._id}`)
            }
        }
    };
</script>