import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getValidSession } from '../../../database/sessions';

const f = createUploadthing();

export const myFileRouter = {
  // Upload samples route
  audioSample: f({ audio: {} })
    .middleware(async ({ req }) => {
      let sessionTokenCookie: RequestCookie | undefined = undefined;

      sessionTokenCookie = req.cookies.get('sessionToken');
      // If you throw, the user will not be able to upload
      if (!sessionTokenCookie) throw new UploadThingError('Unauthorized');

      console.log('sessionToken', sessionTokenCookie.value);
      const session = await getValidSession(sessionTokenCookie.value);

      if (!session) throw new UploadThingError('Invalid Session Token');

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log('file url', file.url);
      console.log('metadata', metadata);
    }),
} satisfies FileRouter;
export type MyFileRouter = typeof myFileRouter;
