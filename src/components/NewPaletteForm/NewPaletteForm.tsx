import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import NewPaletteFormStyles from './NewPaletteFormStyles';

interface NewPaletteFormProps extends WithStyles<typeof NewPaletteFormStyles> {}

const NewPaletteForm = ({ classes }: NewPaletteFormProps): JSX.Element => {
  return (
    <div>
      <h1>New Palette Form</h1>
    </div>
  );
};

export default withStyles(NewPaletteFormStyles)(NewPaletteForm);
