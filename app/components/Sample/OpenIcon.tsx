import React from 'react';

export default function OpenIcon({
  size,
  color,
}: {
  size: string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 28 28"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 4.75H23.75V22.5H21.25V9.08466L7.39738 23.3702L5.60262 21.6298L19.5467 7.25H5V4.75Z"
        fill={color ? color : 'white'}
      />
    </svg>
  );
}
