import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useStyles } from "../style";

export default function LoginForm({
  handleChangeForm,
  submitLogin,
  handleChangeUser
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Grid item xs={5}>
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
          id="password"
          label="Password"
          type="password"
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
          style={{ backgroundColor: "#D83556" }}
          onClick={submitLogin}
        >
          Login
        </Button>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 18 }}>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          onClick={handleChangeForm}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
