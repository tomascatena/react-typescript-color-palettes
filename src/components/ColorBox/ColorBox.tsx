import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import chroma from 'chroma-js';

interface ColorBoxProps {
  background: string;
  name: string;
  id: string;
  showMoreLink?: boolean;
}

const ColorBox = ({
  background,
  name,
  id,
  showMoreLink = true,
}: ColorBoxProps): JSX.Element => {
  const location = useLocation();

  const [copied, setCopied] = useState<Boolean>(false);

  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() >= 0.3;

  const changeCopyState = (): void => {
    setCopied(true);

    setTimeout((): void => {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div
        className='ColorBox'
        style={{ background, height: '100%', width: '100%' }}
      >
        <div
          className={`copyOverlay ${copied && 'show'}`}
          style={{ background }}
        />

        <div className={`copyMessage ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p className={`${isLightColor ? 'darkText' : ''}`}>{background}</p>
        </div>

        <div className='CopyContainer'>
          <div className='BoxContent'>
            <span className={isDarkColor ? 'lightText' : ''}>{name}</span>
          </div>

          <button className='CopyButton'>Copy</button>
        </div>

        {showMoreLink && (
          <Link
            to={`${location.pathname}/${id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`SeeMore ${isLightColor ? 'darkText' : ''}`}>
              More
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
