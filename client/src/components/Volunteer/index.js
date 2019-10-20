import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import Logo from "../../img/logo.png";
import { getRequests, changeRequestStatus } from "../../store/ducks/user";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";

const RequestCard = ({ request }) => {
  const useStyles = makeStyles({
    card: {
      minWidth: 275
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          <b>Descrição:</b> {request.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const InviteCard = ({ request, handleChangeRequestStatus }) => {
  const useStyles = makeStyles({
    card: {
      minWidth: 275
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>
          <b>Descrição:</b>
          {request.description}
        </Typography>
        <Button
          color="primary"
          onClick={() => {
            console.log(request.id);
            handleChangeRequestStatus(request.id, 1);
          }}
        >
          Aceitar
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            console.log(request.id);
            handleChangeRequestStatus(request.id, 2);
          }}
        >
          Não Aceitar
        </Button>
      </CardContent>
    </Card>
  );
};

export default function Volunteer(props) {
  const classes = useStyles();

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests(user.id));
  }, []);

  const handleChangeRequestStatus = (requestId, status) => {
    dispatch(changeRequestStatus(user.id, requestId, status));
  };

  return (
    <div style={{ fontFamily: "Ubuntu" }}>
      <Grid container direction="row">
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <h1 style={{ textAlign: "center" }}>History</h1>
              {user.receivedRequests.length > 0 ? (
                user.receivedRequests.map(request => {
                  if (request.status == 1) {
                    return (
                      <RequestCard
                        request={request}
                        handleChangeRequestStatus={handleChangeRequestStatus}
                      />
                    );
                  }
                })
              ) : (
                <div>Invites Not Found</div>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container direction="column">
            <h1 style={{ textAlign: "center" }}>Invites</h1>
            <Grid item xs={12}>
              {user.receivedRequests.length > 0 ? (
                user.receivedRequests.map(request => {
                  if (request.status == 0) {
                    return (
                      <InviteCard
                        request={request}
                        handleChangeRequestStatus={handleChangeRequestStatus}
                      />
                    );
                  }
                })
              ) : (
                <div>Invites Not Found</div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
