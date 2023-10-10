function isFocusable(element) {
  return (
    element.tabIndex >= 0 &&
    !element.disabled &&
    !element.readonly &&
    element.getAttribute('aria-hidden') !== 'true'
  )
}

export default function getFirstFocusableElement(element) {
  try {
    const _element = element.length > 0 ? [...element] : [element]
    for (let i = 0; i < _element.length; i++) {
      const dom = _element[i]
      if (isFocusable(dom)) {
        return dom
      }
      if (dom.children && dom.children.length) {
        const d = getFirstFocusableElement(dom.children)
        if (d) {
          return d
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return null
}
