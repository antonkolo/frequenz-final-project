export class AudioAnalyzer {
  #ctx: AudioContext;
  #analyzerNode: AnalyserNode;

  constructor(ctx: AudioContext) {
    this.#ctx = ctx;
    this.#analyzerNode = this.#ctx.createAnalyser();
    this.#analyzerNode.minDecibels = -60;
    this.#analyzerNode.smoothingTimeConstant = 0.8;
  }

  connectSource(node: AudioNode) {
    node.connect(this.#analyzerNode);
  }

  getFFT(): Uint8Array {
    const data = new Uint8Array(this.#analyzerNode.frequencyBinCount);
    this.#analyzerNode.getByteFrequencyData(data);
    return data;
  }
}
