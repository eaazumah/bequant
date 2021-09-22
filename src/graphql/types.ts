import { gql } from 'apollo-server-express';

const typeDef = gql`
    scalar JSON

    input GetPricePairs {
        fsyms: String!
        tsyms: String!
    }
    type Query {
        _empty: String
        hello: String
        getPricePairs(input: GetPricePairs!): JSON
    }

    type Subscription {
        _empty: String
    }
`;

export default typeDef;
