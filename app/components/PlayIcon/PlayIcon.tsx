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
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.53431 0.869629L21.6717 10.3789L2.63433 21.5774L1.36678 19.4225L16.3295 10.6209L0.466797 3.13025L1.53431 0.869629Z"
        fill={color}
      />
    </svg>
  );
}
