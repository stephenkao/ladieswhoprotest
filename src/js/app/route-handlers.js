export function genRouteHandler() {
  return true;
  /*
  return (nextState) => {
    const path = nextState.location.pathname;
    const step = getStepForPath(path);
    store.dispatch(setStep(step));
  };
  */
}
