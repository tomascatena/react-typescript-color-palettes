import React, { useState, FC } from 'react';

import MiniPalette from '@components/MiniPalette/MiniPalette';
import { WithStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PaletteListStyles from './PaletteListStyles';

interface ColorPalette {
  paletteName: string;
  id: string;
  emoji: string;
  colors: { name: string; color: string }[];
}

interface PaletteListProps extends WithStyles<typeof PaletteListStyles> {
  palettes: ColorPalette[];
  deletePalette: (id: string) => void;
}

const PaletteList: FC<PaletteListProps> = ({ classes, palettes, deletePalette }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [paletteId, setPaletteId] = useState<string>('');

  const openDialog = (id: string): void => {
    setOpen(true);
    setPaletteId(id);
  };

  const closeDialog = (): void => {
    setOpen(false);
    setPaletteId('');
  };

  const removePalette = (): void => {
    closeDialog();
    deletePalette(paletteId);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.title}>React Colors</h1>

          <Link to={'/palette/new'}>Create Palette</Link>
        </nav>

        <TransitionGroup className={classes.palettes}>
          {
            palettes.map((palette) => {
              return (
                <CSSTransition
                  key={palette.id}
                  classNames='fade'
                  timeout={300}
                >
                  <MiniPalette
                    key={palette.id}
                    {...palette}
                    openDialog={openDialog}
                  />
                </CSSTransition>
              );
            })
          }
        </TransitionGroup>
      </div>

      <Dialog open={open}>
        <DialogTitle>Delete This Palette?</DialogTitle>

        <List>
          <ListItem
            button
            onClick={removePalette}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary='Delete' />
          </ListItem>

          <ListItem
            button
            onClick={closeDialog}
          >
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default withStyles(PaletteListStyles)(PaletteList);
