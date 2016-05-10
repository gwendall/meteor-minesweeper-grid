import { combineReducers } from 'redux';
import gameStatus from '/imports/client/reducers/gameStatus';
import incrementer from '/imports/client/reducers/incrementReducer';
import gameStats from '/imports/client/reducers/gameStats';
import flagNumbers from '/imports/client/reducers/flagNumbers';

const rootReducer = combineReducers({
  gameStatus,
  openTiles: incrementer('OPEN_TILES'),
  gameTime: incrementer('TIME'),
  flagNumbers,
  gameStats
});

export default rootReducer;
