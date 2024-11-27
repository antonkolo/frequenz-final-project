'use client';

import WavesurferPlayer from '@wavesurfer/react';
import React, { Suspense, useState } from 'react';
import type WaveSurfer from 'wavesurfer.js';
import PauseIcon from '../Icons/PauseIcon';
import PlayIcon from '../Icons/PlayIcon';
import styles from './AudioPlayerFull.module.scss';

export function AudioPlayerFull({ sourceUrl }: { sourceUrl: string }) {
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
        <div className={styles['inner-wrapper']}>
          <WavesurferPlayer
            height={200}
            progressColor={'#D9D9D9'}
            barWidth={2}
            cursorWidth={0}
            waveColor={'black'}
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
      </div>
    </Suspense>
  );
}
