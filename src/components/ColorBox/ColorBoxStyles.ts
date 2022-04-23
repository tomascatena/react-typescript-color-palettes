import { createStyles } from '@material-ui/core';
import chroma from 'chroma-js';
import mediaQueries from '../../utils/mediaQueries';

interface Props {
  background: string;
  name: string;
  id: string;
  showMoreLink: boolean;
}

const styles = createStyles({
  colorBox: {
    width: (props: Props) => (props.showMoreLink ? '20%' : '20%'),
    height: (props: Props) => (props.showMoreLink ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-5px',
    '&:hover button': {
      opacity: 1,
      transition: '0.5s',
    },
  },
  copyText: {
    color: (props: Props) =>
      chroma(props.background).luminance() >= 0.3 ? 'rgba(0, 0, 0, 0.7)' : '#fff',
  },
  colorName: {
    color: (props: Props) =>
      chroma(props.background).luminance() <= 0.15 ? '#fff' : 'rgba(0, 0, 0, 1)',
    fontSize: '.9rem',
    display: 'block',
    overflowWrap: 'break-word'
  },
  seeMore: {
    background: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    border: 'none',
    color: (props: Props) =>
      chroma(props.background).luminance() >= 0.3 ? 'rgba(0, 0, 0, 0.7)' : '#fff',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },
  copyButton: {
    color: (props: Props) => (chroma(props.background).luminance() >= 0.3 ? '#000' : '#fff'),
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
    paddingRight: '70px'
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
    display: 'none',
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: 1,
    position: 'absolute',
    display: 'block',
  },
  [mediaQueries.down('m')]: {
    colorBox: {
      width: '50% !important',
      height: '6rem !important',
    },
  },
  [mediaQueries.down('s')]: {
    colorBox: {
      width: '100% !important',
      height: '4rem !important',
    },
    seeMore: {
      bottom: '25%',
    },
  },
});

export default styles;
