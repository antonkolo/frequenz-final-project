import React from 'react';

export default function PauseIcon({
  size,
  color,
}: {
  size: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.5 5V26H8.5V5H13.5Z"
        fill={color}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.5 5V26H18.5V5H23.5Z"
        fill={color}
      />
    </svg>
  );
}
