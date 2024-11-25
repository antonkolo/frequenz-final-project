import Image from 'next/image';
import React from 'react';

export default function ArrowIcon({
  color,
  size,
}: {
  color?: string;
  size: string;
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        width="100%"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.13808 0.141175L19.5 0V18.9102H17V4.47873L1.77771 19.5L0 17.7505L14.9165 2.73616L1.11862 2.62928L1.13808 0.141175Z"
        fill={color ? color : 'black'}
      />
    </svg>
  );
}
