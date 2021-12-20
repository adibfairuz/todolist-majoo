const middleware = () => next => action => {
  const { type, payload } = action;
  // console.log(action)
  if (type.includes('SUCCESS')) {
    if (payload.callback) {
      payload.callback(payload, false)
    }
  }
  else if (action.type.includes('ERROR')) {
    if (payload.callback) {
      payload.callback(payload, true)
    }
  }
  next(action)

};

export default middleware;
