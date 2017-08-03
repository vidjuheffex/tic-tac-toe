import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMarker} from './actions/index';

import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  page: {
    perspective: 500
  },
  board: {
    display: "flex",
    width: '50%',
    flexWrap: "wrap",
    margin: "0 auto",
    transform: 'rotateX(45deg)'
  },
  tileWrapper: {
    flex: '0 0 33%',
    border: '1px solid black',
    textAlign: 'center'
    
  },
  tile: {
    paddingTop: '100%',
    position: 'relative'
  },
  marker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '300%',
    transform: "scale(100%)"
  }
});

function Marker({status}){
  switch(status){
  case 0:
    return (<span>X</span>);
  case 1:
    return (<span>O</span>);
  default:
    return (<span></span>);
  }
}

function WinBanner({gameState, winner}){
  if (winner === 0){
    winner = 'Player 1';
  }
  else if (winner === 1){
    winner = 'Player 2';
  }
  if(gameState === 'complete'){
    return (
      <div>
        <p> Game Complete</p>
        Winner is <span>{winner}</span>
       </div>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}

class App extends Component {
  render() {
    let tiles = Array(9).fill(null).map((e,i)=>{
      return (
        <div key = {i}
             className = {css(styles.tileWrapper)}
             onClick = {e => this.props.addMarker(this.props.id, i)}>
          <div className = {css(styles.tile)} >
            <div className = {css(styles.marker)}>
              <Marker status={this.props.markers[i]}/>
              </div>
          </div>
        </div>
      ); 
    });
    
    return (
      <div className = {css(styles.page)}>
        <div className = {css(styles.board)}>
          {tiles}
        </div>
        <WinBanner gameState ={this.props.gameState} winner={this.props.winner}/>
      </div>
    );
  }
}

let mapStateToProps = state => ({
  id: state.markers.player,
  markers: state.markers.status,
  winner: state.markers.winner,
  gameState: state.markers.gameState
});

let mapDispatchToProps = dispatch => {
  return bindActionCreators({addMarker: addMarker}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
