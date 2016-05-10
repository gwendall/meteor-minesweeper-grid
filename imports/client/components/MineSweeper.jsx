import React from 'react';
import { connect } from 'react-redux';

import { gameStatusType, gameStats } from '/imports/client/constants/actionTypes';

import tickTime from '/imports/client/actions/tick';
import judge from '/imports/client/actions/judge';
import gameOver from '/imports/client/actions/gameOver';
import checkFlag from '/imports/client/actions/checkFlag';
import addTile from '/imports/client/actions/addTile';
import resetGame from '/imports/client/actions/reset';
import { setEasy, setNormal, setHard } from '/imports/client/actions/setDifficulty';

import Table from '/imports/client/components/Table.jsx';

class MineSweeper extends React.Component {
  constructor() {
    super();
    [ 'tick',
      'setDifficulty',
      'reset',
      'checkFlagNumber',
      'addOpenNum',
      'setGameOver'
    ].forEach(f => this[f] = this[f].bind(this));
  }
  componentWillUpdate() {
    const { gameStatus } = this.props;
    if (gameStatus === gameStatusType.PLAYING.label) {
      this.judge();
    }
  }
  componentWillMount() {
    this.intervals = [];
  }
  tick() {
    const { openTiles, gameStatus } = this.props;
    return tickTime(openTiles, gameStatus);
  }
  judge() {
    const { gameStatistics, openTiles } = this.props;
    return judge(gameStatistics, openTiles);
  }
  setGameOver() {
    return gameOver();
  }
  checkFlagNumber(num) {
    return checkFlag(num);
  }
  setMine() {
    const { gameStatistics } = this.props;
    const mineTable = this.state.mineTable;
    const mineRange = _.range(gameStatistics.minNum);
    _.each(mineRange, () => {
      const cell = mineTable[Math.floor(Math.random() * 10)][Math.floor(Math.random() * 10)];
      if (cell.hasMine) {
        return;
      }
      cell.hasMine = true;
      return;
    });
    this.setState({mineTable});
  }
  addOpenNum() {
    const { opentTiles } = this.props;
    if (opentTiles === 0) {
      this.interval = setInterval(this.tick, 1000);
    }
    return addTile();
  }
  reset() {
    const { dispatch } = this.props;
    clearInterval(this.interval);
    return resetGame();
  }
  setDifficulty(type) {
    switch (type) {
    case gameStats.EASY.label:
      return setEasy();
    case gameStats.NORMAL.label:
      return setNormal();
    case gameStats.HARD.label:
      return setHard();
    default:
      return setEasy();
    }
  }
  render() {
    const { gameStatistics, flagNumbers, gameStatus, openTiles, gameTime } = this.props;
    return (
      <div>
        <div className="MineSweeper__level">
          <label>
            <input
              type='radio'
              name='level'
              onChange={_.partial(this.setDifficulty, gameStats.EASY.label)}
              chekced={gameStatistics.level === gameStats.EASY.label}
            />
            easy
          </label>
          <label>
            <input
              type='radio'
              name='level'
              onChange={_.partial(this.setDifficulty, gameStats.NORMAL.label)}
              chekced={gameStatistics.level === gameStats.NORMAL.label}
            />
            normal
          </label>
          <label>
            <input
              type='radio'
              name='level'
              onChange={_.partial(this.setDifficulty, gameStats.HARD.label)}
              chekced={gameStatistics.level === gameStats.HARD.label}
            />
            hard
          </label>
        </div>
        <div className={'MineSweeper ' + gameStatistics.level}>
          <span className='MineSweeper__flagNum'>{gameStatistics.mineNum - flagNumbers}</span>
          <span className='MineSweeper__face' onClick={this.reset}>
            <span className={'button ' + gameStatus}></span>
          </span>
          <span className='MineSweeper__time'>{gameTime}</span>
          <Table
            openNum={openTiles}
            mineNum={gameStatistics.mineNum}
            rowNum={gameStatistics.rowNum}
            colNum={gameStatistics.colNum}
            gameOver={this.setGameOver}
            addOpenNum={this.addOpenNum}
            checkFlagNum={this.checkFlagNumber}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    flagNumbers: state.flagNumbers,
    gameStatistics: state.gameStats,
    gameStatus: state.gameStatus,
    gameTime: state.gameTime,
    openTiles: state.openTiles
  };
}

export default connect(mapStateToProps)(MineSweeper);
