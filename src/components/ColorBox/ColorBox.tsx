import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox = ({ background, name }: ColorBoxProps): JSX.Element => {
  return (
    <CopyToClipboard text={background}>
      <div className='ColorBox' style={{ background }}>
        <div className='CopyContainer'>
          <div className='BoxContent'>
            <span>{name}</span>
          </div>

          <button className='CopyButton'>Copy</button>
        </div>

        <span className='SeeMore'>More</span>
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
