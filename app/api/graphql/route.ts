import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { NextRequest, NextResponse } from 'next/server';
import { title } from 'process';
import {
  getCategoriesInsecure,
  getCategoryInsecure,
} from '../../../database/categories';
import {
  createSampleInsecure,
  deleteSampleInsecure,
  editSampleInsecure,
  getSampleInsecure,
  getSamplesForUser,
  getSamplesInsecure,
} from '../../../database/samples';
import { getUserInsecure, getUsersInsecure } from '../../../database/users';
import type { Resolvers } from '../../../graphql/graphqlGeneratedTypes';
import type { Category, Sample, User } from '../../../types/types';

export type GraphqlResponseBody =
  | {
      user: User;
    }
  | {
      sample: Sample;
    }
  | {
      category: Category;
    }
  | Error;

const typeDefs = gql`
  type User {
    id: ID!
    handle: String!
    passwordHash: String!
    createdAt: String!
    samples: [Sample!]
  }

  type Sample {
    id: ID!
    title: String!
    user: User
    userId: Int
    sourceUrl: String!
    createdAt: String!
    editedAt: String!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
    samples: [Sample]
    user(id: ID!): User
    sample(id: ID!): Sample
    category(id: ID!): Category
    categories: [Category]
  }

  type Mutation {
    createSample(title: String!, userId: Int!, sourceUrl: String!): Sample
    deleteSample(id: Int!): Sample
    editSample(id: Int!, newTitle: String!): Sample
  }
`;

const resolvers: Resolvers = {
  Query: {
    samples: async () => {
      return await getSamplesInsecure();
    },
    users: async () => {
      return await getUsersInsecure();
    },
    categories: async () => {
      return await getCategoriesInsecure();
    },
    user: async (_, args) => {
      return await getUserInsecure(Number(args.id));
    },
    sample: async (_, args) => {
      return await getSampleInsecure(Number(args.id));
    },
    category: async (_, args) => {
      return await getCategoryInsecure(Number(args.id));
    },
  },
  User: {
    samples: async (parent) => {
      return await getSamplesForUser(Number(parent.id));
    },
  },
  Sample: {
    user: async (parent) => {
      return await getUserInsecure(Number(parent.userId));
    },
  },
  Mutation: {
    createSample: async (_, args) => {
      if (
        typeof args.userId !== 'number' ||
        !args.userId ||
        typeof args.title !== 'string' ||
        !args.title ||
        typeof args.sourceUrl !== 'string' ||
        !args.sourceUrl
      ) {
        throw new GraphQLError('Arguments missing or of wrong type');
      }
      return await createSampleInsecure(args);
    },
    deleteSample: async (_, args) => {
      return await deleteSampleInsecure(args.id);
    },
    editSample: async (_, args) => {
      return await editSampleInsecure(args.id, args.newTitle);
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });

const apolloServerRouteHandler = startServerAndCreateNextHandler(apolloServer);

// export async function POST(req: NextRequest) {
//   return await apolloServerRouteHandler(req);
// }

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GraphqlResponseBody>> {
  return (await apolloServerRouteHandler(
    req,
  )) as NextResponse<GraphqlResponseBody>;
}

export async function POST(
  req: NextRequest,
): Promise<NextResponse<GraphqlResponseBody>> {
  return (await apolloServerRouteHandler(
    req,
  )) as NextResponse<GraphqlResponseBody>;
}
