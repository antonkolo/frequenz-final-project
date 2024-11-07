'use client';

import React from 'react';
import { UploadButton } from '../../../utils/uploadthing';

export default function UploadSampleForm() {
  return (
    <form>
      <UploadButton
        endpoint="audioSample"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log('Files: ', res);
          alert('Upload Completed');
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </form>
  );
}
