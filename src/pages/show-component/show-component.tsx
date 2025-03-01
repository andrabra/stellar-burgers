import { FC, ReactNode } from 'react';
import styles from './show-component.module.css';

interface ShowComponentProps {
  children: ReactNode;
  title: string;
}

export const ShowComponent: FC<ShowComponentProps> = ({ title, children }) => (
  <div className={styles.wrapper}>
    <h1 className={'text text_type_main-large'}>{title}</h1>
    {children}
  </div>
);
