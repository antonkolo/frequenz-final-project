'use client';

import WavesurferPlayer from '@wavesurfer/react';
import React, { Suspense, useState } from 'react';
import type WaveSurfer from 'wavesurfer.js';
import PauseIcon from '../PauseIcon/PauseIcon';
import PlayIcon from '../PlayIcon/PlayIcon';
import styles from './AudioPlayer.module.scss';

export function AudioPlayer({ sourceUrl }: { sourceUrl: string }) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws: WaveSurfer) => {
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
          cursorWidth={0}
          width={344}
          waveColor={'black'}
          height={120}
          normalize
          url={sourceUrl}
          onReady={onReady}
          onPlay={() => setIsPlaying(true)}
          onPause={() => {
            setIsPlaying(false);
            wavesurfer!.setTime(0);
          }}
        />

        <button className={styles['play-button']} onClick={onPlayPause}>
          {isPlaying ? (
            <PauseIcon color="#000" size="56" />
          ) : (
            <PlayIcon color="#000" size="48" />
          )}
        </button>
      </div>
    </Suspense>
  );
}
