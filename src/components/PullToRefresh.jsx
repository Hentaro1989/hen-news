import React, { useState, useMemo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isBrowser } from '../functions';

const useStyles = makeStyles({
  progress: {
    textAlign: 'center',
    display: ({ diffY }) => (diffY === 0 ? 'none' : 'block'),
    paddingTop: ({ diffY }) => diffY / 8,
    paddingBottom: ({ diffY }) => diffY / 8,
  },
});

export default ({ children, onPull }) => {
  if (!isBrowser) {
    return null;
  }

  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const diffY = useMemo(() => Math.abs(startY - currentY), [startY, currentY]);
  const classes = useStyles({ diffY: diffY });

  const [html] = document.getElementsByTagName('html');

  function onTouchStart({ targetTouches: [{ screenY }] }) {
    setStartY(screenY);
    setCurrentY(screenY);
  }

  function onTouchMove({ targetTouches: [{ screenY }] }) {
    if (html.scrollTop === 0) {
      setCurrentY(screenY);
    }
  }

  async function onTouchEnd({ changedTouches: [{ screenY }] }) {
    if (html.scrollTop === 0) {
      setCurrentY(screenY);

      if (diffY > 200) {
        await onPull();
      }
    }
    setStartY(0);
    setCurrentY(0);
  }

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className={classes.progress}>
        <CircularProgress />
      </div>
      {children}
    </div>
  );
};
