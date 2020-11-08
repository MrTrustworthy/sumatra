<template>
    <v-container fluid>

        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-3" @click="() => voteCrumb(1)" v-bind="attrs" v-on="on">
                    <v-icon :color="getVoteStyle(1)">arrow_upward</v-icon>
                </v-btn>
            </template>
            <span>{{ getVoteTooltip(1) }}</span>
        </v-tooltip>

        <v-avatar class="mx-3" :color="votes <= 0 ? 'primary' : 'accent'" size="36">
            <span>{{ votes }}</span>
        </v-avatar>

        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="mx-3" @click="() => voteCrumb(-1)" v-bind="attrs" v-on="on">
                    <v-icon :color="getVoteStyle(-1)">arrow_downward</v-icon>
                </v-btn>
            </template>
            <span>{{ getVoteTooltip(-1) }}</span>
        </v-tooltip>

    </v-container>
</template>

<script>
    export default {
        name: "Votes",
        props: {
            votes: {type: Number, required: true},
            ownVote: {type: Number, required: true},
            objectId: {type: [String, Number], required: true},
            objectType: {type: String, required: true, validator: (val) => ["crumb", "crumblink"].includes(val)}
        },
        computed: {
            mutationArgs() {
                const args = {
                    crumb: {gql: "VoteCrumb", client: "crumbler"},
                    crumblink: {gql: "VoteCrumbLink", client: "zelda"}
                };
                return args[this.objectType];
            },
        },
        methods: {
            getVoteStyle(vote) {
                return vote === this.ownVote ? 'accent' : 'primary';
            },
            voteCrumb(vote) {
                // remove vote if it's the already-active vote
                if (vote === this.ownVote) vote = 0;

                this.$apollo.mutate({
                    mutation: require(`../graphql/${this.mutationArgs.gql}.gql`),
                    variables: {
                        id: this.objectId,
                        vote: vote
                    },
                    client: `${this.mutationArgs.client}Client`,
                });
            },
            getVoteTooltip(vote) {
                const tooltips = {
                    crumb: {
                        '1': "This is a high-quality post",
                        '-1': "This post needs to be improved"
                    },
                    crumblink: {
                        '1': "This is relevant top crumb",
                        '-1': "This has little to do with the top crumb"
                    }
                };

                return tooltips[this.objectType][vote];
            }
        },
    };
</script>
