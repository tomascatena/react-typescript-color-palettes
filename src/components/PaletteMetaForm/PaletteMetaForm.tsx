import React, { useState, FC } from 'react';
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
import { BaseEmoji, Picker } from 'emoji-mart/dist-es';
import 'emoji-mart/css/emoji-mart.css';

interface PaletteMetaFormProps extends WithStyles<typeof PaletteMetaFormStyles> {
  newPaletteName: string;
  handlePaletteNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreateNewPalette: (emoji: string) => void;
}

const PaletteMetaForm: FC<PaletteMetaFormProps> = ({
  classes,
  newPaletteName,
  handlePaletteNameChange,
  handleCreateNewPalette,
}) => {
  const [stage, setStage] = useState<string>('');

  const handleClickOpen = (): void => {
    setStage('form');
  };

  const handleClickClose = (): void => {
    setStage('');
  };

  const handleSubmitName = (): void => {
    handleClickClose();
    setStage('emoji');
  };

  const handleSubmitPalette = (emoji: BaseEmoji): void => {
    handleCreateNewPalette(emoji.native);
    setStage('');
  };

  return (
    <div>
      <Dialog
        open={stage === 'emoji'}
        onClose={handleClickClose}
      >
        <Picker
          onSelect={handleSubmitPalette}
          title='Pick a Palette Emoji'
          set='apple'
          sheetSize={32}
        />
      </Dialog>

      <Button
        variant='contained'
        color='primary'
        onClick={handleClickOpen}
      >
        Save
      </Button>

      <Dialog
        open={stage === 'form'}
        onClose={handleClickClose}
        aria-labelledby='form-dialog-title'
        PaperProps={{
          style: {},
        }}
      >
        <DialogTitle id='form-dialog-title'>Save Your Palette 🎨</DialogTitle>

        <ValidatorForm
          onSubmit={handleSubmitName}
          onError={(errors) => console.log(errors)}
        >
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new palette.
              <br />
              Make sure is unique! 🦄
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
            <Button
              onClick={handleClickClose}
              color='primary'
            >
              Cancel
            </Button>

            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default withStyles(PaletteMetaFormStyles)(PaletteMetaForm);
