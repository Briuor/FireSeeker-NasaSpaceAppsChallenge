import axios from "axios";

// Action Types
export const Types = {
  GET_COORDINATES_STARTED: "coordinates/GET_COORDINATES_STARTED",
  GET_COORDINATES_SUCCESS: "coordinates/GET_COORDINATES_SUCCESS",
  GET_COORDINATES_FAILED: "coordinates/GET_COORDINATES_FAILED"
};

// Reducer
const initialState = {
  intervalRef: 0,
  points: [],
  loading: false
};

export function coordinatesReducer(state = initialState, action) {
  switch (action.type) {
    case Types.GET_COORDINATES_STARTED:
      return {
        ...state,
        points: [],
        loading: true
      };
    case Types.GET_COORDINATES_SUCCESS:
      return {
        ...state,
        points: action.payload.points,
        loading: false
      };
    case Types.GET_LAST_COORDINATES_SUCCESS:
      return {
        ...state,
        points: [],
        loading: false
      };
    default:
      return state;
  }
}

// Action Creators
// get all records of coordinates in the date day/month/year,
// and fill the lastcoordinate with the last coordinate of this date
export function getCoordinates() {
  return function(dispatch) {
    // in getCoordinatesStarted erase the state
    dispatch(getCoordinatesStarted());
    axios
      .get(`http://200.235.82.14:4000/firespots/Goiás`)
      .then(res => {
        console.log(res.data);
        let newPoints = [];
        const resCoordinates = res.data;
        const lastCoordinate = [];
        if (resCoordinates.length > 0) {
          for (let i = 0; i < resCoordinates.length; i++) {
            console.log(
              resCoordinates[i].longitude,
              resCoordinates[i].latitude
            );
            newPoints.push([
              Number.parseFloat(resCoordinates[i].longitude),
              Number.parseFloat(resCoordinates[i].latitude)
            ]);
          }
          // last position becomes the last position of the date
          lastCoordinate.push(newPoints[newPoints.length - 1]);
          dispatch(getCoordinatesSuccess(newPoints));
        } else {
          // dispatch(getCoordinatesFailed());
        }
      })
      .catch(error => {
        // dispatch(getCoordinatesFailed());
      });
  };
}

const getCoordinatesStarted = () => ({
  type: Types.GET_COORDINATES_STARTED
});

const getCoordinatesSuccess = points => ({
  type: Types.GET_COORDINATES_SUCCESS,
  payload: {
    points
  }
});
