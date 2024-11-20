import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { getValidSession } from '../../../database/sessions';

const f = createUploadthing();
const auth = (req: Request) => ({ id: 'fakeId' }); // Fake auth function
export const myFileRouter = {
  profilePicture: f({ image: { maxFileSize: '4MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload

      const sessionTokenCookie = await req.cookies.get('sessionToken');

      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!sessionTokenCookie) throw new UploadThingError('Unauthorized');
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId);
      console.log('file url', file.url);
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
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
