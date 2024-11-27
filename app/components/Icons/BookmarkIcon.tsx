import React from 'react';

export default function BookmarkIcon({
  size,
  color,
  fill,
}: {
  size: string;
  color?: string;
  fill: 'white' | 'black' | 'none';
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 28 28"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7 3L8 2H19.9913L20.9913 3V25L19.2343 25.6534L14.1485 19.7608L8.73782 25.675L7 25V3ZM9 4V22.4254L13.4325 17.5805L14.9273 17.6021L18.9913 22.3108V4H9Z"
        fill={color ? color : 'black'}
      />
    </svg>
  );
}
