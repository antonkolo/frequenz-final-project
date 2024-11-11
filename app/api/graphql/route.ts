import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextRequest, NextResponse } from 'next/server';
import {
  getSampleInsecure,
  getSamplesForUser,
  getSamplesInsecure,
} from '../../../database/samples';
import { getUserInsecure, getUsersInsecure } from '../../../database/users';
import type { Resolvers } from '../../../graphql/graphqlGeneratedTypes';
import type { Sample, User } from '../../../types/types';

export type GraphqlResponseBody =
  | {
      user: User;
    }
  | {
      sample: Sample;
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
    user: User!
    sourceUrl: String!
    createdAt: String!
    editedAt: String!
  }

  type Query {
    users: [User]
    samples: [Sample]
    user(id: ID!): User
    sample(id: ID!): Sample
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
    user: async (_, args) => {
      return await getUserInsecure(Number(args.id));
    },
    sample: async (_, args) => {
      return await getSampleInsecure(Number(args.id));
    },
  },
  User: {
    samples: async (parent) => {
      return await getSamplesForUser(parent.id);
    },
  },
  Sample: {
    user: async (parent) => {
      return await getUserInsecure(Number(parent.userId));
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
