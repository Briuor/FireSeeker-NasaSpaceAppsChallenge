import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactMapGL, { Marker, GeolocateControl } from "react-map-gl";
import Menu from "./Menu";
import ButtonBase from "@material-ui/core/ButtonBase";

// import PolylineOverlay from "./PolylineOverlay";
import { logout } from "../../store/ducks/user";
import {
  getLastCoordinate,
  getCoordinates
} from "../../store/ducks/coordinates";

export default function DashBoard(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const coordinates = useSelector(state => state.coordinates);
  const [viewport, setViewPort] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: -22.405683,
    longitude: -45.4404,
    zoom: 15
  });
  let intervalRef = useRef([]);

  useEffect(() => {
    dispatch(getCoordinates());
    return () => {};
  }, []);

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
        <Marker
          latitude={-22.405683099999997}
          longitude={-45.4404002}
          offsetLeft={-15}
          offsetTop={-10}
        >
          <ButtonBase>
            <img
              src="https://material-ui.com/static/images/avatar/1.jpg"
              alt=""
              width="30"
              height="30"
              style={{ borderRadius: 100 }}
            />
          </ButtonBase>
        </Marker>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
      </ReactMapGL>
      {/* <Menu
        getCoordinates={getCoordinates}
        handleLogout={handleLogout}
        handleCancel={handleCancel}
        handleInit={handleInit}
      /> */}
    </div>
  );
}
