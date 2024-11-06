import RandomWavePlayer from './_components/RandomWavePlayer/RandomWavePlayer';
import ThreeCanvas from './_components/ThreeCanvas/ThreeCanvas';
import ThreeDObject from './_components/ThreeScene/ThreeDObject';

// import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <RandomWavePlayer />
      <ThreeCanvas>
        <ThreeDObject />
      </ThreeCanvas>
    </div>
  );
}
