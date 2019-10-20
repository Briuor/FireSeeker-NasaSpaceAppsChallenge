import { makeStyles } from "@material-ui/core/styles";
import Background from "../../img/banner.png";
import Logo from "../../img/logo.png";

export const useStyles = makeStyles(theme => ({
  body: {
    margin: "0",
    padding: "0"
  },
  wrapper: {
    height: "135vh",
    background: `url(${Background}) no-repeat`,
    backgroundSize: "contain",
    backgroundPosition: "right"
  },
  mainContainer: {
    paddingLeft: "10%",
    paddingTop: 80
  },
  logo: {
    background: `url(${Logo}) no-repeat`
  },
  button: {
    marginTop: 5,
    width: 400
  },
  textField: {
    width: 400
  },
  input: {
    display: "none"
  },
  formTitle: {
    margin: 0,
    paddingLeft: 10,
    fontFamily: "Ubuntu"
  }
}));
