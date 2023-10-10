;(function flexible(window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1
  // adjust body font size
  function setBodyFontSize(key, value) {
    if (document.body) {
      document.body.style[key] = value
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize('fontSize', 12 * dpr + 'px')
  var zoomRatio = 1
  var rem = docEl.clientWidth / 10
  var base = 116.8
  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var width = docEl.clientWidth
    if (width > 1280) {
      width = 1280
    }
    if (width < 980) {
      width = 980
    }
    rem = width / 10
    docEl.style.fontSize = rem + 'px'
    dpr = 1
    // zoomRatio = rem / 116.8
    // if(docEl.clientWidth<=1168){
    //   setBodyFontSize('zoom', zoomRatio)
    // }else{
    //   setBodyFontSize('zoom', 1)
    // }
    // setBodyFontSize('zoom', zoomRatio)
    // document.body.style.zoom = ratio
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }

  window.getZoomHeight = function (ratio) {
    return (window.innerHeight * (ratio || 1)) / zoomRatio
  }

  window.getZoomWidth = function (ratio) {
    return (window.innerWidth * (ratio || 1)) / zoomRatio
  }

  window.getZoomRatio = function () {
    return zoomRatio
  }

  window.getRealMeasurement = function (len) {
    return window.parseInt(len * zoomRatio * dpr)
  }
  window.usePxToPx = function (len) {
    return (len / base) * rem
  }
})(window, document)
