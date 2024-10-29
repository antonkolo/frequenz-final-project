import ThreeCanvas from './_components/ThreeCanvas/ThreeCanvas';
import ThreeDObject from './_components/ThreeDObject/ThreeDObject';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <ThreeCanvas children={ThreeDObject()}></ThreeCanvas>
    </div>
  );
}
