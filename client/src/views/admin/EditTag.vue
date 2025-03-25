<template>
    <div class="edit-tag-container">
        <tag-form
        @createOrUpdate="createOrUpdate"
        :tag="tag"></tag-form>
    </div>
</template>

<script>
import TagForm from '@/components/TagForm.vue';
import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'UpdateTag',
        components: {
            'tag-form': TagForm
        },
        data() {
            return {
                tag: {}
            }
        },
        methods: {
            async createOrUpdate(tag) {
                await exportApis.tags.updateTag(tag);
                alert('Tag updated successfully!');
                this.$router.push(`/admin/tags/${tag._id}`);
            }
        },
        async mounted() {
            this.tag = await exportApis.tags.getTag(this.$route.params.id);
        }
    }
</script>