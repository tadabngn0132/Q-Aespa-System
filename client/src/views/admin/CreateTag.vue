<template>
    <div class="create-tag-container">
        <tag-form
        @createOrUpdate="createOrUpdate"
        ></tag-form>
    </div>
</template>

<script>
import TagForm from '@/components/TagForm.vue';
import exportApis from '@/helpers/api/exportApis';

    export default {
        name: 'CreateTag',
        components: {
            'tag-form': TagForm
        },
        methods: {
            createOrUpdate: async function(tag) {
                const res = await exportApis.tags.createTag(tag);
                this.flash('Tag created successfully!', 'success');
                alert('Tag created successfully!');
                this.$router.push(`/admin/tags/${res._id}`);
                
            }
        }
    }
</script>