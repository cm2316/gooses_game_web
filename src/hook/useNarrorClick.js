const Hook = (clickHandler) => {
  if (!clickHandler) {
    return {}
  }
  const onKeyDown = (evt) => {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      clickHandler(evt)
      evt.stopPropagation()
    }
  }
  return {
    onClick: clickHandler,
    onKeyDown,
  }
}

export default Hook
