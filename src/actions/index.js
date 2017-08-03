import * as actionTypes from '../actionTypes/index'; 

export const addMarker = (playerId, tileKey) => {
  return {
    type: actionTypes.ADD_MARKER,
    payload: {playerId, tileKey}
  };
};


