import ThreeCanvas from './_components/ThreeCanvas/ThreeCanvas';
import ThreeDObject from './_components/ThreeScene/ThreeDObject';

// import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <ThreeCanvas>
        <ThreeDObject />
      </ThreeCanvas>
    </div>
  );
}
