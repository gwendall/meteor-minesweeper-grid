import Store from '/imports/client/stores/store';
import { gameStatusType } from '/imports/client/constants/actionTypes';

export default function gameOver() {
  return Store.dispatch({
    type: gameStatusType.OVER.value
  });
}
