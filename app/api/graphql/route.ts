import crypto from 'node:crypto';
import { gql } from '@apollo/client';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { makeExecutableSchema } from '@graphql-tools/schema';
import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { cookies } from 'next/headers';
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
  getSampleLikeForUserAndSample,
  getSampleLikesForSample,
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
import { createSessionInsecure } from '../../../database/sessions';
import {
  createUserInsecure,
  getUserByIdInsecure,
  getUserInsecure,
  getUsersInsecure,
  getUserWithPasswordHashInsecure,
} from '../../../database/users';
import type { Resolvers } from '../../../graphql/graphqlGeneratedTypes';
import { userSchema } from '../../../types/schemas';
import type { Category, Sample, User } from '../../../types/types';
import { secureCookieOptions } from '../../../utils/cookies';

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
    user(handle: String!): User
    sample(id: ID!): Sample
    category(id: ID!): Category
    categories: [Category]
    sampleLikeForUserAndSample(sampleId: ID!, userId: ID!): SampleLike
  }

  type Mutation {
    createSample(title: String!, userId: Int!, sourceUrl: String!): Sample
    deleteSample(id: Int!): Sample
    editSample(id: Int!, newTitle: String!): Sample
    createSampleCategory(sampleId: Int!, categoryId: Int!): SampleCategory
    deleteSampleCategory(id: Int!): SampleCategory
    createSampleLike(userId: Int!, sampleId: Int!): SampleLike
    deleteSampleLike(id: Int!): SampleLike

    register(handle: String!, password: String!): User
    login(handle: String!, password: String!): User
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
      return await getUserInsecure(args.handle);
    },
    sample: async (_, args) => {
      return await getSampleInsecure(Number(args.id));
    },
    category: async (_, args) => {
      return await getCategoryInsecure(Number(args.id));
    },

    sampleLikeForUserAndSample: async (_, args) => {
      return await getSampleLikeForUserAndSample(
        Number(args.userId),
        Number(args.sampleId),
      );
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
      return await getUserByIdInsecure(Number(parent.userId));
    },
    sampleCategories: async (parent) => {
      return await getSampleCategoriesForSample(Number(parent.userId));
    },
    sampleLikes: async (parent) => {
      return await getSampleLikesForSample(Number(parent.userId));
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
    user: async (parent) => {
      return await getUserByIdInsecure(Number(parent.sampleId));
    },
  },
  Mutation: {
    createSample: async (_, args, context) => {
      if (!context.sessionTokenCookie) {
        throw new GraphQLError('Unauthorized operation');
      }

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
    deleteSample: async (_, args, context) => {
      if (!context.sessionTokenCookie) {
        throw new GraphQLError('Unauthorized operation');
      }
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
    register: async (parent, args) => {
      const validatedArgs = userSchema.safeParse(args);
      // 1. Check if required fields are present
      if (validatedArgs.error) {
        throw new GraphQLError(JSON.stringify(validatedArgs.error.format()));
        // throw new GraphQLError('hi mom');
      }

      // 2. Check if user already exist in the database
      const user = await getUserInsecure(args.handle);

      if (user) {
        throw new GraphQLError('Username already taken');
      }

      // 3. Hash the plain password from the user
      const passwordHash = await bcrypt.hash(args.password, 12);

      // 4. Save the user information with the hashed password in the database
      const newUser = await createUserInsecure(args.handle, passwordHash);

      if (!newUser) {
        throw new GraphQLError('Registration failed');
      }

      // 5. Create a token
      const token = crypto.randomBytes(100).toString('base64');

      // 6. Create the session record
      const session = await createSessionInsecure(token, Number(newUser.id));

      if (!session) {
        throw new GraphQLError('Sessions creation failed');
      }

      (await cookies()).set({
        name: 'sessionToken',
        value: session.token,
        ...secureCookieOptions,
      });

      return newUser;
    },

    login: async (parent, args) => {
      if (
        typeof args.handle !== 'string' ||
        typeof args.password !== 'string' ||
        !args.handle ||
        !args.password
      ) {
        throw new GraphQLError('Required field missing');
      }

      // 3. verify the user credentials
      const userWithPasswordHash = await getUserWithPasswordHashInsecure(
        args.handle,
      );

      if (!userWithPasswordHash) {
        throw new GraphQLError('username or password not valid');
      }

      // 4. Validate the user password by comparing with hashed password
      const passwordHash = await bcrypt.compare(
        args.password,
        userWithPasswordHash.passwordHash,
      );

      if (!passwordHash) {
        throw new GraphQLError('username or password not valid');
      }

      // 5. Create a token
      const token = crypto.randomBytes(100).toString('base64');

      // 6. Create the session record
      const session = await createSessionInsecure(
        token,
        userWithPasswordHash.id,
      );

      if (!session) {
        throw new GraphQLError('Sessions creation failed');
      }

      (await cookies()).set({
        name: 'sessionToken',
        value: session.token,
        ...secureCookieOptions,
      });

      return null;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({ schema });

const apolloServerRouteHandler = startServerAndCreateNextHandler<NextRequest>(
  apolloServer,
  {
    context: async (req) => {
      return {
        sessionTokenCookie: req.cookies.get('sessionToken'),
      };
    },
  },
);

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
