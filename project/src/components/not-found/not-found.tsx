import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

function NotFound(): JSX.Element {
  return (
    <div
      className={styles['page-not-found']}
    >
      <h1>404 Not Found</h1>
      <Link
        className={styles['page-not-found__link']}
        to='/'
      >
        Go to the main page
      </Link>
    </div>
  );
}

export default NotFound;
