import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import Menu from "./Menu";
import VolunteerModal from "./../VolunteerModal";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fire from "./../../img/fire.png";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

// import PolylineOverlay from "./PolylineOverlay";
import { logout, updateUser, addRequest } from "../../store/ducks/user";
import {
  getLastCoordinate,
  getCoordinates
} from "../../store/ducks/coordinates";

const currencies = [
  {
    value: "1",
    label: "Ambientalista"
  },
  {
    value: "2",
    label: "Veterinario"
  },
  {
    value: "3",
    label: "Bombeiro"
  },
  {
    value: "4",
    label: "Brigadista"
  }
];

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    boxShadow: theme.shadows[5],
    maxWidth: "500px",
    padding: theme.spacing(2, 4, 3),
    borderRadius: "20px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  font: {
    fontFamily: "Arial",
    color: "#D83556",
    textAlign: "center"
  },
  fontP: {
    color: "gray",
    textAlign: "center"
  },
  botoesForm: {
    borderColor: "red"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function DashBoard(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const coordinates = useSelector(state => state.coordinates);
  const [open, setOpen] = React.useState(false);
  const [viewport, setViewPort] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: -22.405683,
    longitude: -45.4404,
    zoom: 7
  });
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChangeUser = e => {
    const newUser = user;
    newUser.request[e.target.id] = e.target.value;
    dispatch(updateUser(newUser));
  };

  const handleOpenModal = isOpen => {
    // setOpenModal(isOpen);
  };

  useEffect(() => {
    console.log(user.state);
    dispatch(getCoordinates(user.state));
    return () => {};
  }, []);

  const handleAddRequest = () => {
    dispatch(addRequest(user));
  };

  // const handleLogout = () => {
  //   dispatch(logout(props.history));
  // };

  // const handleCancel = () => {
  //   for (let i = 0; i < intervalRef.current.length; i++)
  //     clearInterval(intervalRef.current[i]);
  // };
  // const handleInit = () => {
  //   dispatch(getLastCoordinate(user.login));
  //   let id = setInterval(() => {
  //     dispatch(getLastCoordinate(user.login));
  //   }, 2000);
  //   intervalRef.current.push(id);
  // };

  return (
    <div>
      <ReactMapGL
        mapboxApiAccessToken={
          "pk.eyJ1IjoiYnJpdW9yIiwiYSI6ImNrMGxkeTR6ZDBpem4zbHVwMzBscG90cGIifQ.C-0c4zSBGhajBrFatd6eig"
        }
        {...viewport}
        onViewportChange={viewport => setViewPort(viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* <PolylineOverlay points={coordinates.points} /> */}
        {coordinates.points.map(point => {
          return (
            <Marker
              latitude={point[1]}
              longitude={point[0]}
              offsetLeft={-15}
              offsetTop={-10}
            >
              <ButtonBase onClick={handleOpen}>
                <img
                  src={Fire}
                  alt=""
                  width="30"
                  height="30"
                  style={{ borderRadius: 100 }}
                />
              </ButtonBase>
            </Marker>
          );
        })}

        {/* <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        /> */}
      </ReactMapGL>
      {/* <VolunteerModal /> */}
      {/* <Menu
        getCoordinates={getCoordinates}
        handleLogout={handleLogout}
        handleCancel={handleCancel}
        handleInit={handleInit}
      /> */}

      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className={classes.font}>
              Choose your team
            </h2>
            <p id="transition-modal-description" className={classes.fontP}>
              Enter here what the demand is and what role you need to volunteer
              for.
            </p>

            <TextField
              id="description"
              label="Occurrence description"
              style={{ margin: 8 }}
              multiline
              rowsMax="4"
              fullWidth
              className={classes.botoesForm}
              margin="normal"
              variant="outlined"
              onChange={handleChangeUser}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="atuation"
              label="Atuation"
              onChange={handleChangeUser}
              type="text"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="nro_needed"
              label="Number of Volunteers"
              onChange={handleChange("age")}
              type="number"
              onChange={handleChangeUser}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
              variant="outlined"
            />

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleAddRequest}
            >
              Send
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
