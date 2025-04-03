<template>
    <div class="vote-btn-container">
        <button class="up-vote">
            <i class="fa-solid fa-plus"></i>
        </button>
        <div class="score">1</div>
        <button class="down-vote">
            <i class="fa-solid fa-minus"></i>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'VoteButton',
        props: {
            question: {
                type: Object,
                required: true,
                default: () => {}
            }
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .vote-btn-container {
        display: flex;
        flex-direction: column;
    }

    .vote-btn-container .up-vote,
    .vote-btn-container .down-vote {
        border-radius: 50%;
        border: 0.1em solid #f0f0f0;
        padding: 0.9em 1em;
        margin-bottom: 0.55em;
        outline: none;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 2.5px 5px;
        transition: all 0.3s ease-in-out;
    }

    .vote-btn-container .down-vote {
        margin-top: 0.6em;
    }

    .vote-btn-container .up-vote:hover,
    .vote-btn-container .down-vote:hover {
        border: 0.1em solid #8BCAD9;
        background-color: #8BCAD9;
    }

    .vote-btn-container .up-vote:active,
    .vote-btn-container .down-vote:active {
        border: 0.1em solid #555;
        box-shadow: none;
        background-color: #8BCAD9;
    }

    .vote-btn-container .score {
        font-size: 19px;
        font-weight: bold;
    }
</style>