import { SET_CURRENT_COLOR } from '../actions';
import { Map } from 'immutable';

const colorInitState = {
  currentColor: '#00FF00',
};
export function color(state = colorInitState, action) {
  switch(action.type) {
    case SET_CURRENT_COLOR: {
      return { ...state, currentColor: action.color };
    }
    default: return state;
  }
}

const toolInitState = {
  currentTool: 'DRAW',
};
export function tool(state = toolInitState, action) {
  return state;
}

const gridInitState = {
  grid: Map()
}
export function grid(state = gridInitState, action) {
  return state;
}
