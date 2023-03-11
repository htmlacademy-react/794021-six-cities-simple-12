import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const blockStyle: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle: CSSProperties = {
  textDecoration: 'revert',
};

function NotFound(): JSX.Element {
  return (
    <div
      style={blockStyle}
    >
      <h1>404 Not Found</h1>
      <Link
        style={linkStyle}
        to='/'
      >
        Go to the main page
      </Link>
    </div>
  );
}

export default NotFound;
