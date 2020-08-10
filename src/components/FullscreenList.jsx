import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(() => ({
  appBar: {
    position: 'fixed',
  },
  title: {
    flex: 1,
  },
  list: {
    marginTop: '64px',
  },
}));

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default ({ openState, setValue, list, appBarLabel }) => {
  const classes = useStyles();
  const [isOpen, setOpen] = openState;
  const handleClose = (category) => () => {
    setValue(category);
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={isOpen} onClose={handleClose()} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {appBarLabel}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose()} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.list}>
          {list.map((item, i) => (
            <ListItem button divider key={i} onClick={handleClose(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
};
