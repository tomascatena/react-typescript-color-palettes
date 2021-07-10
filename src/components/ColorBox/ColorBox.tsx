import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';
import { WithStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  colorBox: {
    width: (props) => (props.showMoreLink ? '20%' : '20%'),
    height: (props) => (props.showMoreLink ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover button': {
      opacity: 1,
      transition: '0.5s',
    },
  },
  copyText: {
    color: (props: Props) =>
      chroma(props.background).luminance() >= 0.3
        ? 'rgba(0, 0, 0, 0.7)'
        : '#fff',
  },
  colorName: {
    color: (props: Props) =>
      chroma(props.background).luminance() <= 0.1 ? '#fff' : 'rgba(0, 0, 0, 1)',
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    border: 'none',
    color: (props: Props) =>
      chroma(props.background).luminance() >= 0.3
        ? 'rgba(0, 0, 0, 0.7)'
        : '#fff',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: (props: Props) =>
      chroma(props.background).luminance() >= 0.3 ? '#000' : '#fff',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '20px',
    textTransform: 'uppercase',
    border: 'none',
    opacity: 0,
    cursor: 'pointer',
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    left: 0,
    bottom: 0,
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '12px',
  },
  copyMessage: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: '3rem',
    transform: 'scale(0.1)',
    opacity: 0,
    color: '#fff',

    '& h1': {
      fontWeight: 800,
      textShadow: '1px 2px #000',
      background: 'rgba(255, 255, 255, 0.2)',
      width: '100%',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase',
    },

    '& p': {
      fontSize: '3rem',
      fontWeight: 100,
    },
  },
  showCopyMessage: {
    opacity: 1,
    transform: 'scale(1)',
    zIndex: 2,
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s',
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    width: '100%',
    height: '100%',
    transition: 'transform 0.6s ease-in-out',
    transform: 'scale(0.1)',
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: 1,
    position: 'absolute',
  },
});

interface Props {
  background: string;
  name: string;
  id: string;
  showMoreLink: boolean;
}

interface ColorBoxProps extends WithStyles<typeof styles> {
  background: string;
  name: string;
  id: string;
  showMoreLink?: boolean;
}

const ColorBox = ({
  classes,
  background,
  name,
  id,
  showMoreLink = true,
}: ColorBoxProps): JSX.Element => {
  const location = useLocation();

  const [copied, setCopied] = useState<Boolean>(false);

  const changeCopyState = (): void => {
    setCopied(true);

    setTimeout((): void => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className={classes.colorBox} style={{ background }}>
        <div
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          style={{ background }}
        />

        <div
          className={`${classes.copyMessage} ${
            copied && classes.showCopyMessage
          }`}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>

        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>

          <button className={classes.copyButton}>Copy</button>
        </div>

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

export default withStyles(styles)(ColorBox);
