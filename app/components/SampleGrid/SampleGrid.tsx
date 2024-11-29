import React from 'react';
import styles from './SampleGrid.module.scss';

type Props = {
  children: React.ReactNode;
};
export default function SampleGrid({ children }: Props) {
  return <ul className={styles.container}>{children}</ul>;
}
