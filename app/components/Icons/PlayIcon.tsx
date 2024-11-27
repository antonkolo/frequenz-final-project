import React from 'react';

export default function PlayIcon({
  size,
  color,
}: {
  size: string;
  color: string;
}) {
  return (
    <svg
      width={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.53431 0.869629L21.6717 10.3789L2.63433 21.5774L1.36678 19.4225L16.3295 10.6209L0.466797 3.13025L1.53431 0.869629Z"
        fill={color}
      /> */}
      <path d="M24 14.5L4 26V3L24 14.5Z" fill="black" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 14.5L4 3V26L24 14.5ZM22.9969 14.5L4.5 3.86426V25.1357L22.9969 14.5Z"
        fill="white"
      />
    </svg>
  );
}
