'use client';

import React from 'react';

// initialise variables
let context: AudioContext | null = null;
let oscillatorNode: OscillatorNode | null = null;

function generateRandomWaveAndFrequency(): [OscillatorType, number] {
  const waveforms: OscillatorType[] = [
    'sine',
    'square',
    'sawtooth',
    'triangle',
  ];
  return [
    waveforms[Math.floor(Math.random() * waveforms.length)]!,
    50 + Math.floor(Math.random() * 200),
  ];
}

function playRandomSound() {
  // create audio context only if doesn't exist
  if (!context) {
    context = new AudioContext();
  }

  // create nodes
  oscillatorNode = context.createOscillator();
  const gainNode = context.createGain();
  const filter = new BiquadFilterNode(context, {
    type: 'lowpass',
    frequency: 400,
  });

  // randomize waveform and frequency
  const [type, frequency] = generateRandomWaveAndFrequency();

  // set oscillator params
  oscillatorNode.frequency.value = frequency;
  oscillatorNode.type = type;
  gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 3);

  // connect oscillator to gain and gain to destination (speaker)
  oscillatorNode.connect(gainNode).connect(filter).connect(context.destination);

  oscillatorNode.start(0);
}

async function mute() {
  if (context && context.state === 'running') {
    await context.suspend();
  }
}

async function unmute() {
  if (context && context.state === 'suspended') {
    await context.resume();
  }
}

export default function RandomWavePlayer() {
  return (
    <>
      <button onClick={playRandomSound}>Play Sound</button>
      <button onClick={mute}>Mute</button>
      <button onClick={unmute}>Unmute</button>
    </>
  );
}
