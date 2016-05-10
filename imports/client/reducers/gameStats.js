import * as types from '/imports/client/constants/actionTypes.js';
const { EASY, NORMAL, HARD } = types.gameStats;

const defaultStat = {
  level: EASY.label,
  mineNum: 10,
  rowNum: 9,
  colNum: 9
};

export default function gameStatistics(state, action) {
  switch (action.type) {
  case EASY.value:
    return defaultStat;
  case HARD.value:
    return {
      level: NORMAL.label,
      minNum: 40,
      rowNum: 16,
      colNum: 16
    };
  case HARD.value:
    return {
      level: HARD.label,
      minNum: 100,
      rowNum: 16,
      colNum: 30
    };
  default:
    return defaultStat;
  }
}