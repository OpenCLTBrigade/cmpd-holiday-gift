import { makeExecutableSchema } from 'graphql-tools';

export const typeDefs = `
    type Affiliation {
        id: Int!
        type: String
        name: String
        addressStreet: String
        addressStreet2: String
        addressCity: String
        addressState: String
        addressZip: String
        phone: String
    }

    type PagedAffiliations {
        totalSize: Int
        perPage: Int
        page: Int
        lastPage: Int
        items: [Affiliation]
    }

    type Query {
        affiliations: PagedAffiliations
        affiliation(id: Int!): Affiliation
    }
`;

export default makeExecutableSchema({ typeDefs });
