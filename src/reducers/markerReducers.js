import * as actionTypes from '../actionTypes/index'; 
import winStates from '../utils/winStates';

export default (state = {
  gameState: "active",
  winner: "",
  player: 0,
  status: Array(9).fill(null)
}, action) => {
  let newState = {...state};
  switch (action.type) {
  case actionTypes.ADD_MARKER:
    if (newState.status[action.payload.tileKey] === null && newState.gameState === 'active'){
      newState.status[action.payload.tileKey] = action.payload.playerId;
      winStates.forEach((winStates,i,a) => {
        if (winStates.every( number => newState.status[number] === newState.player)){
          newState.gameState = "complete";
          newState.winner = newState.player;
        };
      });
      if(newState.status.every(e => e != null) && newState.winner === ""){
        console.log("cat");
        newState.gameState = "complete";
        newState.winner = "No one, you all lose";
      }
      newState.player = newState.player === 0 ? 1 : 0;
    };
    return newState;
  default:
    return newState;
  }
}



