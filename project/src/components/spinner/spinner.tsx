import styles from './spinner.module.css';

type SpinnerProps = {
  text: string;
}

export function Spinner({ text }: SpinnerProps): JSX.Element {
  return (
    <dialog
      className={styles.block}
    >
      {text}
    </dialog>
  );
}
