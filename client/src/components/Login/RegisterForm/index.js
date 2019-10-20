import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import { updateUserEntity } from "../../../store/ducks/user";
import { useStyles } from "../style";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterForm({
  handleChangeForm,
  handleChangeUser,
  handleChangeUserSpecify,
  submitRegister
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleGetPosition = () => {
    navigator.geolocation.getCurrentPosition(setPosition);
  };

  const setPosition = position => {
    console.log(position.coords.latitude, position.coords.longitude);
    handleChangeUserSpecify(
      position.coords.latitude,
      position.coords.longitude
    );
  };

  const [value, setValue] = React.useState("0");

  const handleChange = event => {
    setValue(event.target.value);
    dispatch(updateUserEntity(Number.parseInt(event.target.value)));
  };

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="Password"
          type="password"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          id="is_entity"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="0"
            control={<Radio />}
            label="I'm a Volunteer"
          />
          <FormControlLabel
            value="1"
            control={<Radio />}
            label="I'm an Organization"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12}>
        <p style={{ margin: 0, color: "red" }}>
          Just fill the field below if you represents an organization.
        </p>
        <TextField
          id="organization"
          label="Organization"
          type="text"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
          style={{ marginTop: 0 }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="company_code"
          label="Company Code"
          type="text"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="atuation"
          label="Atuation"
          type="text"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="state"
          label="State"
          type="text"
          className={classes.textField}
          onChange={handleChangeUser}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} style={{ marginTop: 18 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submitRegister}
          style={{ backgroundColor: "#D83556" }}
        >
          Register
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 18 }}>
        <Button className={classes.button} onClick={handleChangeForm}>
          back to login
        </Button>
      </Grid>
    </Grid>
  );
}
