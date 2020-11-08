import Vue from "vue";
import VueApollo from "vue-apollo";
import {createApolloClient} from "vue-cli-plugin-apollo/graphql-client";

Vue.use(VueApollo);

// Config
const defaultOptions = {
    wsEndpoint: null,
    //tokenName: process.env.VUE_APP_GRAPHQL_TOKEN_NAME,
    persisting: false,
    websocketsOnly: false,
    ssr: false,
};

const sudokuOptions = {
    httpEndpoint: process.env.VUE_APP_SUDOKU_GRAPHQL_HTTP,
};


export function createProvider() {
    const {apolloClient: sudokuClient} = createApolloClient({
        ...defaultOptions,
        ...sudokuOptions,
    });

    return new VueApollo({
        clients: {sudokuClient},
        defaultClient: sudokuClient,
        errorHandler(error) {
            console.log(
                "%cApolloError",
                "background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;",
                error.message
            );
        },
    });
}
