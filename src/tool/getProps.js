export const isNullOrUndefind = (value) => {
  return value === null || value === undefined
}
export const getProps = (props, context, propsArray = [], defaults = {}) => {
  return propsArray.reduce((values, prop) => {
    if (!isNullOrUndefind(props[prop])) {
      values[prop] = props[prop]
    } else if (!isNullOrUndefind(context[prop])) {
      values[prop] = context[prop]
    } else if (!isNullOrUndefind(defaults[prop])) {
      values[prop] = defaults[prop]
    }
    return values
  }, {})
}
