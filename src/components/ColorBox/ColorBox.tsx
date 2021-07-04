import './ColorBox.css';

interface ColorBoxProps {
  background: string;
  name: string;
}

const ColorBox = ({ background, name }: ColorBoxProps): JSX.Element => {
  return (
    <div className='ColorBox' style={{ background: background }}>
      <span>{name}</span>
      <span>MORE</span>
    </div>
  );
};

export default ColorBox;
