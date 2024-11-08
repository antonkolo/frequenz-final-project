import { gql } from '@apollo/client';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { getSamplesInsecure } from '../../../database/samples';

const typeDefs = gql`
  type User {
    id: ID!
    handle: String!
    passwordHash: String!
    createdAt: String!
  }

  type Sample {
    id: ID!
    title: String!
    userId: User!
    createdAt: String!
    editedAt: String!
  }

  type Query {
    users: [User]
    samples: [Sample]
  }
`;

const resolvers = {
  Query: {
    samples: async () => {
      return await getSamplesInsecure();
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
