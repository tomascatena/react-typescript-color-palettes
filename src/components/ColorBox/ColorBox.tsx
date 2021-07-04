import './ColorBox.css';

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox = ({ background, name }: ColorBoxProps): JSX.Element => {
  return (
    <div className='ColorBox' style={{ background }}>
      <div className='CopyContainer'>
        <div className='BoxContent'>
          <span>{name}</span>
        </div>

        <button className='CopyButton'>Copy</button>
      </div>

      <span className='SeeMore'>More</span>
    </div>
  );
};

export default ColorBox;
