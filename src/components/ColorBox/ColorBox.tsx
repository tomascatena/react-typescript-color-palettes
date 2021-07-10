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
      chroma(props.background).luminance() >= 0.3 ? '#000' : '#fff',
  },
  colorName: {
    color: (props: Props) =>
      chroma(props.background).luminance() <= 0.1 ? '#fff' : '#000',
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

  const isLightColor = chroma(background).luminance() >= 0.3;

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
          className={`copyOverlay ${copied && 'show'}`}
          style={{ background }}
        />

        <div className={`copyMessage ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>

        <div className='CopyContainer'>
          <div className='BoxContent'>
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
