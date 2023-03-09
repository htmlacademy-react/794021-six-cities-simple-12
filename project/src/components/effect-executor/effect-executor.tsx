import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type EffectExecutorProps = {
  cb: () => void;
}

export default function EffectExecutor({ cb }: EffectExecutorProps): null {
  const { pathname } = useLocation();

  useEffect(() => {
    cb && cb();
  }, [cb, pathname]);

  return null;
}
