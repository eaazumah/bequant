import GraphQLJSON from 'graphql-type-json';
import { QueryGetPricePairsArgs } from '../@types/schema';
import getPrices from '../services/get-prices';

const resolvers = {
    JSON: GraphQLJSON,
    Query: {
        hello: () => 'Hello world!',
        getPricePairs: async (_: any, args: QueryGetPricePairsArgs) => {
            const { fsyms, tsyms } = args.input;
            return getPrices(fsyms, tsyms);
        }
    }
};

export default resolvers;
