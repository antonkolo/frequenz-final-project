'use client';

import React from 'react';
import { AudioAnalyzer } from '../../../lib/audio-analyzer';
import ThreeCanvas from '../ThreeCanvas/ThreeCanvas';
import Scene from '../ThreeScene/Scene';

// initialise variables
let context: AudioContext | null = null;
let audioAnalyzer: AudioAnalyzer | null = null;
let oscillatorNode: OscillatorNode | null = null;

// hardcoded values
const DEG = Math.PI / 180;

// helper functions
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

function makeDistortionCurve(k = 50) {
  const nSamples = 44100;
  const curve = new Float32Array(nSamples);
  curve.forEach((_, i) => {
    const x = (i * 2) / nSamples - 1;
    curve[i] = ((3 + k) * x * 20 * DEG) / (Math.PI + k * Math.abs(x));
  });
  return curve;
}

// functions
function playRandomSound() {
  // create audio context only if doesn't exist
  if (!context) {
    context = new AudioContext();
  }

  if (!audioAnalyzer) {
    audioAnalyzer = new AudioAnalyzer(context);
  }

  // create nodes
  oscillatorNode = context.createOscillator();
  const gainNode = context.createGain();
  const filter = new BiquadFilterNode(context, {
    type: 'lowpass',
    frequency: 400,
  });
  const curve = makeDistortionCurve();

  const shaper = new WaveShaperNode(context, {
    curve: curve,
    oversample: '4x',
  });

  // randomize waveform and frequency
  const [type, frequency] = generateRandomWaveAndFrequency();

  // set oscillator params
  oscillatorNode.frequency.value = frequency;
  oscillatorNode.type = type;
  gainNode.gain
    .setValueAtTime(0.08, context.currentTime)
    .exponentialRampToValueAtTime(0.000001, context.currentTime + 3);

  // connect oscillator to gain and gain to destination (speaker)
  oscillatorNode
    .connect(gainNode)
    .connect(shaper)
    .connect(filter)
    .connect(context.destination);

  // play
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
    <ThreeCanvas>
      <Scene onClick={playRandomSound} analyzer={audioAnalyzer} />
    </ThreeCanvas>
  );
}
