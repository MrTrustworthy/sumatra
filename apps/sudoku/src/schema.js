const {gql} = require("apollo-server");
const {createSudoku} = require("./resolvers");

const typeDefs = gql`

    type Sudoku {
        id: ID
        data: String
    }

    type Query {
        createSudoku: [Sudoku!]
    }
`;

const resolvers = {
    Query: {
        createSudoku: createSudoku,

    },
};

module.exports = {typeDefs, resolvers};
