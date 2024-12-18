import React from 'react';

export default function ArrowBackIcon({
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
        d="M7.14118 24.8619L7 6.5H25.9102V9H11.4787L26.5 24.2223L24.7505 26L9.73616 11.0835L9.62928 24.8814L7.14118 24.8619Z"
        fill={color ? color : 'white'}
      />
    </svg>
  );
}
