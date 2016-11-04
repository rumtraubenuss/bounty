export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';
export function setCurrentColor(color) {
  return({
    type: SET_CURRENT_COLOR,
    color,
  });
}
