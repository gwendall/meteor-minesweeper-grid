import Store from '/imports/client/stores/store';
import { openTiles } from '/imports/client/constants/actionTypes';

export default function addTile() {
  return Store.dispatch({
    type: openTiles.UPDATE
  });
}
