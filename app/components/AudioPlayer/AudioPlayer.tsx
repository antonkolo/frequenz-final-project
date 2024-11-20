'use client';

import WavesurferPlayer from '@wavesurfer/react';
import React, { Suspense, useState } from 'react';
import styles from './AudioPlayer.module.scss';

export function AudioPlayer({ sourceUrl }: { sourceUrl: string }) {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };
  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.wrapper}>
        <WavesurferPlayer
          fillParent
          normalize
          cursorColor="#a4b37d"
          waveColor="#6c48a9"
          progressColor="#a4b37d"
          url={sourceUrl}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <button onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    </Suspense>
  );
}
