import React from 'react';

export default function DownloadIcon({
  color,
  size,
}: {
  color?: string;
  size: string;
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 32 32"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.0954 16.7049L16.2114 29.7886L2.83988 16.417L4.60765 14.6493L14.8122 24.8539L14.9544 3.46845L17.4485 3.44847L17.5177 24.6128L27.3498 14.9318L29.0954 16.7049Z"
        fill={color ? color : 'white'}
      />
    </svg>
  );
}
