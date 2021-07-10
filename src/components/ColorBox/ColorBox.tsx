import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ColorBoxProps {
  background: string;
  name: string;
  id: string;
}

const ColorBox = ({ background, name, id }: ColorBoxProps): JSX.Element => {
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
      <div className='ColorBox' style={{ background }}>
        <div
          className={`copyOverlay ${copied && 'show'}`}
          style={{ background }}
        />

        <div className={`copyMessage ${copied && 'show'}`}>
          <h1>copied!</h1>
          <p>{background}</p>
        </div>

        <div className='CopyContainer'>
          <div className='BoxContent'>
            <span>{name}</span>
          </div>

          <button className='CopyButton'>Copy</button>
        </div>

        <Link
          to={`${location.pathname}/${id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <span className='SeeMore'>More</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
