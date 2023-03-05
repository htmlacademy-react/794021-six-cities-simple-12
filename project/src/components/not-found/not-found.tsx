import { Link } from 'react-router-dom';

export default NotFound;

function NotFound(): JSX.Element {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link
        to='/'
      >
        Go to the main page
      </Link>
    </>
  );
}
