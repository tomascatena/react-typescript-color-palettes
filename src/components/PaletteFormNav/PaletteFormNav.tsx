import useStyles from './PaletteFormNavStyles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteFormNavProps {
  open: boolean;
  handleDrawerOpen: () => void;
  savePalette: (newPalette: ColorPalette) => void;
  colors: { name: string; color: string }[];
}

const PaletteFormNav = ({
  open,
  handleDrawerOpen,
  savePalette,
  colors,
}: PaletteFormNavProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [newPaletteName, setNewPaletteName] = useState<string>('');

  const handlePaletteNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewPaletteName(event.target.value);
  };

  const handleCreateNewPalette = (): void => {
    const newPalette: ColorPalette = {
      paletteName: newPaletteName,
      emoji: '',
      id: newPaletteName.toLowerCase().replaceAll(' ', '-'),
      colors,
    };

    savePalette(newPalette);

    history.push('/');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AddCircleIcon />
          </IconButton>

          <Typography variant='h6' noWrap>
            Create A Palette
          </Typography>
        </Toolbar>

        <div className={classes.navButtons}>
          <ValidatorForm
            onSubmit={handleCreateNewPalette}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              value={newPaletteName}
              onChange={handlePaletteNameChange}
              name='newPaletteName'
              label='palette name'
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Please enter a name for the palette',
                'The name is already taken by another palette',
              ]}
            />

            <Button variant='contained' color='primary' type='submit'>
              Save Palette
            </Button>
          </ValidatorForm>

          <Link to='/'>
            <Button variant='contained' color='secondary'>
              Go Back
            </Button>
          </Link>
        </div>
      </AppBar>
    </div>
  );
};

export default PaletteFormNav;
