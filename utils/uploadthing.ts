import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';
import type { MyFileRouter } from '../api/uploadthing/core';

export const UploadButton = generateUploadButton<MyFileRouter>();
export const UploadDropzone = generateUploadDropzone<MyFileRouter>();
