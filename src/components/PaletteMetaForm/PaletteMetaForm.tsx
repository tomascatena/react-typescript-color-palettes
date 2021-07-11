import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaletteMetaFormStyles from './PaletteMetaFormStyles';
import { withStyles } from '@material-ui/styles';
import { WithStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

interface PaletteMetaFormProps
  extends WithStyles<typeof PaletteMetaFormStyles> {
  newPaletteName: string;
  handlePaletteNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateNewPalette: () => void;
}

const PaletteMetaForm = ({
  classes,
  newPaletteName,
  handlePaletteNameChange,
  handleCreateNewPalette,
}: PaletteMetaFormProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleCreateNewPalette();
    handleClose();
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {},
        }}
      >
        <DialogTitle id='form-dialog-title'>Save Your Palette 🎨</DialogTitle>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText>
              <p>Please enter a name for your new palette.</p>
              <p>Make sure is unique! 🦄</p>
            </DialogContentText>

            <TextValidator
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              name='newPaletteName'
              autoComplete='off'
              label='palette name'
              fullWidth
              className={classes.paletteNameInput}
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Please enter a name for the palette',
                'The name is already taken by another palette',
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default withStyles(PaletteMetaFormStyles)(PaletteMetaForm);
