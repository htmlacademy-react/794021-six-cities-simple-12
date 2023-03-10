import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type EffectExecutorProps = {
  onPathnameChange: () => void;
}

function PathnameChangeEffectExecutor(
  { onPathnameChange }: EffectExecutorProps
): null {
  const { pathname } = useLocation();

  useEffect(() => {
    onPathnameChange && onPathnameChange();
  }, [onPathnameChange, pathname]);

  return null;
}

export default PathnameChangeEffectExecutor;
