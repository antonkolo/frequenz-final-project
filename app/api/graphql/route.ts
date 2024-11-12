import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLError } from 'graphql';
import { NextRequest, NextResponse } from 'next/server';
import {
  getCategoriesInsecure,
  getCategoryInsecure,
} from '../../../database/categories';
import {
  createSampleCategoryInsecure,
  deleteSampleCategoryInsecure,
  getSampleCategoriesForSample,
  getSamplesForCategory,
} from '../../../database/sampleCategories';
import {
  createSampleLikeInsecure,
  deleteSampleLikeInsecure,
  getSampleLikesForUser,
} from '../../../database/sampleLikes';
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
    sampleLikes: [SampleLike!]
  }

  type Sample {
    id: ID!
    title: String!
    user: User
    userId: Int
    sourceUrl: String!
    createdAt: String!
    editedAt: String!
    sampleCategories: [SampleCategory!]
    sampleLikes: [SampleLike!]
  }

  type Category {
    id: ID!
    name: String!
    sampleCategories: [SampleCategory!]
  }

  type SampleCategory {
    id: ID!
    sample: Sample
    sampleId: Int
    category: Category
    categoryId: Int
  }

  type SampleLike {
    id: ID!
    sample: Sample
    user: User
    sampleId: Int
    userId: Int
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
    createSampleCategory(sampleId: Int!, categoryId: Int!): SampleCategory
    deleteSampleCategory(id: Int!): SampleCategory
    createSampleLike(userId: Int!, sampleId: Int!): SampleLike
    deleteSampleLike(id: Int!): SampleLike
    # create sample like
    # delete sample like
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
    sampleLikes: async (parent) => {
      return await getSampleLikesForUser(Number(parent.id));
    },
  },
  Sample: {
    user: async (parent) => {
      return await getUserInsecure(Number(parent.userId));
    },
    sampleCategories: async (parent) => {
      return await getSampleCategoriesForSample(Number(parent.userId));
    },
  },
  Category: {
    sampleCategories: async (parent) => {
      return await getSamplesForCategory(Number(parent.id));
    },
  },
  SampleCategory: {
    sample: async (parent) => {
      return await getSampleInsecure(Number(parent.sampleId));
    },
  },
  SampleLike: {
    sample: async (parent) => {
      return await getSampleInsecure(Number(parent.sampleId));
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
    createSampleCategory: async (_, args) => {
      return await createSampleCategoryInsecure(args.sampleId, args.categoryId);
    },
    deleteSampleCategory: async (_, args) => {
      return await deleteSampleCategoryInsecure(args.id);
    },
    createSampleLike: async (_, args) => {
      return await createSampleLikeInsecure(args.userId, args.sampleId);
    },
    deleteSampleLike: async (_, args) => {
      return await deleteSampleLikeInsecure(args.id);
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
