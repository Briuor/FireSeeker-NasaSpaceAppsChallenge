import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

const currencies = [
    {
      value: '1',
      label: 'Ambientalista',
    },
    {
      value: '2',
      label: 'Veterinario',
    },
    {
      value: '3',
      label: 'Bombeiro',
    },
    {
      value: '4',
      label: 'Brigadista',
    },
];
  

const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      
      boxShadow: theme.shadows[5],
      maxWidth: "500px",
      padding: theme.spacing(2, 4, 3),
      borderRadius: "20px",
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        
      },
      dense: {
        marginTop: theme.spacing(2),
      },
      menu: {
        width: 200,
      },
      fab: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
      font: {
        fontFamily: "Arial",
        color: "#D83556",
        textAlign: "center",
      },
      fontP: {
     
        color: "gray",
        textAlign: "center",
      },
      botoesForm: {
          borderColor: "red",
      },
      button: {
        margin: theme.spacing(1),
      },
  }));

  export default function VolunteerModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
      });
      const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Decidir Equipe
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
            

        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title"  className={classes.font} >Choose your team</h2>
            <p id="transition-modal-description" className={classes.fontP} >Enter here what the demand is and what role you need to volunteer for.</p>

            <TextField
            id="outlined-full-width"
            label="Occurrence description"
            style={{ margin: 8}}
            multiline
            rowsMax="4"
            fullWidth
            className={classes.botoesForm}
            margin="normal"
            variant="outlined"
            InputLabelProps={{
            shrink: true,

            }}
            />

            <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={values.currency}
            onChange={handleChange('currency')}
            SelectProps={{
            MenuProps: {
                className: classes.menu,
            },
            }}
            helperText="Please select your currency"
            margin="normal"
            variant="outlined"
            >
                {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <TextField
            id="outlined-number"
            label="Number"
            value={values.age}
            onChange={handleChange('age')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            margin="normal"
            variant="outlined"
            />

            <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<CloudUploadIcon />}
            >Send
            </Button>
            
          </div>
        </Fade>

        
      </Modal>
    </div>
  );
}
