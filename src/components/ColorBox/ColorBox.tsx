import './ColorBox.styles.ts';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, useLocation } from 'react-router-dom';
import { WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ColorBoxStyles from './ColorBox.styles';
import React, { FC, useEffect, useState } from 'react';

interface ColorBoxProps extends WithStyles<typeof ColorBoxStyles> {
  background: string;
  name: string;
  id: string;
  showMoreLink?: boolean;
}

const ColorBox: FC<ColorBoxProps> = ({ classes, background, name, id, showMoreLink = true }) => {
  const location = useLocation();

  const [copied, setCopied] = useState<boolean>(false);

  const changeCopyState = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    document.body.classList.toggle('hide-scroll-bars', copied);
  }, [copied]);

  return (
    <CopyToClipboard
      text={background}
      onCopy={changeCopyState}
    >
      <div
        className={classes.colorBox}
        style={{ background }}
      >
        <div
          data-testid='copy-overlay'
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          style={{ background }}
        />

        <div
          data-testid='copy-message'
          className={`${classes.copyMessage} ${copied && classes.showCopyMessage}`}
        >
          <h1>copied!</h1>

          <p className={classes.copyText}>{background}</p>
        </div>

        <details>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>

          <button className={classes.copyButton}>Copy</button>
        </details>

        {showMoreLink && (
          <Link
            to={`${location.pathname}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export { ColorBox };

export default withStyles(ColorBoxStyles)(ColorBox);
