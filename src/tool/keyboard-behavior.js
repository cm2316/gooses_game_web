// 可聚焦模块选择器
const FocusBlockSelector = '[data-focus-block]'
// 焦点框
let focusBoxElement = null
// 最后一次聚焦元素
let lastFocusElement = null
// 定时器
let timer = null
// 页面是否具有焦点
let hasFocusInView = document.hasFocus()

const boxBorderWidth = 3

/**
 * 创建并返回焦点框元素
 * @param {String} id 焦点框ID
 * @returns Element
 */
function setupFocusBox(id = 'Focus_Box') {
  if (focusBoxElement) {
    return focusBoxElement
  }
  focusBoxElement = document.createElement('div')
  focusBoxElement.setAttribute('id', id)
  focusBoxElement.setAttribute('class', `${id}_Style`)
  focusBoxElement.style.position = 'absolute'
  focusBoxElement.style.zIndex = 9999
  focusBoxElement.style.outline = `${boxBorderWidth}px dashed rgb(0,191,255)`
  focusBoxElement.style.pointerEvents = 'none'
  focusBoxElement.style.transformOrigin = 'center'
  focusBoxElement.style.transitionProperty = 'top,left'
  focusBoxElement.style.transitionDuration = '0.1s'
  focusBoxElement.style.transitionTimingFunction = 'linear'
  document.body.append(focusBoxElement)
  return focusBoxElement
}

/**
 * 显示焦点框
 */
function showFocusBox() {
  const boundingRect = document.activeElement.getBoundingClientRect()
  focusBoxElement.style.left = `${boundingRect.x + boxBorderWidth}px`
  focusBoxElement.style.top = `${boundingRect.y + boxBorderWidth}px`
  focusBoxElement.style.width = `${boundingRect.width - boxBorderWidth * 2}px`
  focusBoxElement.style.height = `${boundingRect.height - boxBorderWidth * 2}px`
  focusBoxElement.style.display = 'block'
}

/**
 * 隐藏焦点框
 */
function hideFocusBox() {
  focusBoxElement.style.display = 'none'
}

/**
 * 启动焦点检测
 */
function setupFocusCheck() {
  if (hasFocusInView) {
    if (document.activeElement && document.activeElement !== document.body) {
      showFocusBox()
    } else {
      hideFocusBox()
    }
  }
  timer = requestAnimationFrame(setupFocusCheck)
}

/**
 * 获取容器内所有可聚焦节点
 * @param {Element} target container node
 * @returns Array<Element>
 */
export function getFocusableElements(target = document) {
  if (!target) {
    return []
  }
  return Array.from(
    target.querySelectorAll(`a[href]:not([tabindex='-1']),
  area[href]:not([tabindex='-1']),
  input:not([disabled]):not([tabindex='-1']),
  select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),
  iframe:not([tabindex='-1']),
  [tabindex]:not([tabindex='-1']),
  [contentEditable=true]:not([tabindex='-1'])`)
  ).filter((el) => {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
  })
}

/**
 * 聚焦指定元素并返回是否成功
 * @param {Element} ele 聚焦元素
 * @returns Boolean
 */
function setFocus(ele) {
  ele?.focus()
  return ele === document.activeElement
}

/**
 * 获取容器内所有定义节点
 * @param {Element} target Container node
 * @returns Array<Element>
 */
function getFocusBlocks(target = document) {
  return Array.from(target.querySelectorAll(FocusBlockSelector)).filter(
    (focusBlock) => getFocusableElements(focusBlock).length > 0
  )
}

/**
 * 获取最近的自定义父节点
 * @param {Element} target Focusable node
 * @returns Element
 */
function getClosestFocusBlock(target = document.activeElement) {
  return target.closest(FocusBlockSelector)
}

/**
 * 设置聚焦模块焦点索引
 * @param {Element} focusBlock 可聚焦模块
 * @param {Element} target 聚焦元素
 */
function setFocusBlockActiveIndex(focusBlock, target = document.activeElement) {
  if (focusBlock) {
    const allFocusableElements = getFocusableElements(focusBlock)
    const tempFocusIndex = allFocusableElements.indexOf(target)
    if (tempFocusIndex > -1) {
      focusBlock.setAttribute('data-focus-index', tempFocusIndex)
      focusBlock.setAttribute('data-focus-max', allFocusableElements.length)
    }
  }
}

/**
 * 获取聚焦模块焦点索引
 * @param {Element} focusBlock 可聚焦模块
 * @param {Number} defaultIndex 默认值
 * @returns Number
 */
function getFocusBlockActiveIndex(focusBlock, defaultIndex = 0) {
  if (focusBlock) {
    return focusBlock.getAttribute('data-focus-index') || defaultIndex
  }
  return defaultIndex
}

/**
 * 获取相对位置的自定义节点
 * @param {Element} focusBlock 自定义节点块
 * @param {Int} relative 相对位置
 * @returns Element
 */
function getFocusBlockByRelative(focusBlock, relative = 1) {
  const allFocusBlocks = getFocusBlocks()
  const activeIndex = allFocusBlocks.indexOf(focusBlock)
  if (activeIndex === -1) {
    return null
  }
  const _pos = relative + activeIndex
  return allFocusBlocks[_pos] || null
}

/**
 * 获取上一个自定义节点
 * @param {Element} target 聚焦节点
 * @returns Element
 */
function getPrevFocusBlock(target = document.activeElement) {
  const focusBlock = getClosestFocusBlock(target)
  setFocusBlockActiveIndex(focusBlock, target)
  let preFocusBlock = getFocusBlockByRelative(focusBlock, -1)
  while (preFocusBlock !== null && preFocusBlock.contains(focusBlock)) {
    preFocusBlock = getFocusBlockByRelative(preFocusBlock, -1)
  }
  return preFocusBlock
}

/**
 * 获取下一个自定义节点
 * @param {Element} target 聚焦节点
 * @returns Element
 */
function getNextFocusBlock(target = document.activeElement) {
  const focusBlock = getClosestFocusBlock(target)
  setFocusBlockActiveIndex(focusBlock, target)
  let nextFocusBlock = getFocusBlockByRelative(focusBlock, 1)
  while (nextFocusBlock !== null && focusBlock.contains(nextFocusBlock)) {
    nextFocusBlock = getFocusBlockByRelative(nextFocusBlock, 1)
  }
  return nextFocusBlock
}

// 聚焦节点类型
const PositionType = {
  Relative: 0,
  Absolute: 1,
  Static: 2,
}

// 固定聚焦节点位置
const StaticPosType = {
  First: -1,
  Last: 1,
}

/**
 * 获取给定自定义节点内相对聚焦节点
 * @param {Element} focusBlock 自定义节点
 * @param {Number} relative 相对位置
 * @param {String} type 给定聚焦节点类型（Relative：相对位置；Absolute：绝对位置；Static:固定位置--first/last）
 * @param {Element} target 相对元素
 * @returns Element
 */
function getFocusableElementInFocusBlock(
  focusBlock,
  pos = 1,
  type = 'relative',
  target = document.activeElement
) {
  const allFocusableElements = getFocusableElements(focusBlock)
  const size = allFocusableElements.length
  if (size === 0) {
    return null
  }
  // 获取固定位置
  if (PositionType.Static === type) {
    // 获取第一个
    if (StaticPosType.First === pos) {
      return allFocusableElements[0]
    }
    // 获取最后一个
    if (StaticPosType.Last === pos) {
      return allFocusableElements[size - 1]
    }
  }
  // 获取指定位置
  if (PositionType.Absolute === type) {
    return allFocusableElements[pos] || null
  }
  // 获取相对位置
  if (PositionType.Relative === type) {
    const activeIndex = allFocusableElements.indexOf(target)
    if (activeIndex === -1) {
      return null
    }
    const _pos = pos + activeIndex
    return allFocusableElements[_pos] || null
  }
  return null
}

/**
 * 获取上一个聚焦节点
 * @param {Element} target 聚焦节点
 * @returns Elemment
 */
function getPrevFocusableElementInFocusBlock(target = document.activeElement) {
  const focusBlock = getClosestFocusBlock(target)
  return getFocusableElementInFocusBlock(focusBlock, -1, PositionType.Relative, target)
}

/**
 * 获取上下一个聚焦节点
 * @param {Element} target 聚焦节点
 * @returns Elemment
 */
function getNextFocusableElementInFocusBlock(target = document.activeElement) {
  const focusBlock = getClosestFocusBlock(target)
  return getFocusableElementInFocusBlock(focusBlock, 1, PositionType.Relative, target)
}

/**
 * 获取第一个聚焦节点
 * @param {Element} focusBlock 自定义节点
 * @returns Elemment
 */
function getFirstFocusableElementInFocusBlock(focusBlock) {
  return getFocusableElementInFocusBlock(focusBlock, StaticPosType.First, PositionType.Static)
}

/**
 * 获取最后一个聚焦节点
 * @param {Element} focusBlock 自定义节点
 * @returns Elemment
 */
function getLastFocusableElementInFocusBlock(focusBlock) {
  return getFocusableElementInFocusBlock(focusBlock, StaticPosType.Last, PositionType.Static)
}

/**
 * 键盘事件Handler
 * @param {KeyboardEvent} evt 键盘事件
 */
function onKeydownHandler(evt) {
  const keyCode = evt.keyCode
  const intercepted = [37, 38, 39, 40].includes(keyCode)
  if (intercepted) {
    console.log('intercepted')
    evt.preventDefault()
    evt.stopPropagation()
  }
  // 向左
  if (keyCode === 37) {
    const prevElement = getPrevFocusableElementInFocusBlock()
    if (prevElement) {
      setFocus(prevElement)
    } else {
      // Tab
    }
  }
  // 向上
  if (keyCode === 38) {
    const prevFocusBlock = getPrevFocusBlock()
    if (prevFocusBlock) {
      const activeIndex = getFocusBlockActiveIndex(prevFocusBlock, -1)
      let focusableElement
      if (activeIndex > -1) {
        focusableElement = getFocusableElementInFocusBlock(
          prevFocusBlock,
          activeIndex,
          PositionType.Absolute
        )
      }
      if (!focusableElement) {
        focusableElement = getLastFocusableElementInFocusBlock(prevFocusBlock)
      }
      if (focusableElement) {
        setFocus(focusableElement)
      }
    }
  }
  // 向右
  if (keyCode === 39) {
    const nextElement = getNextFocusableElementInFocusBlock()
    if (nextElement) {
      setFocus(nextElement)
    }
  }
  // 向下
  if (keyCode === 40) {
    const nextFocusBlock = getNextFocusBlock()
    if (nextFocusBlock) {
      const activeIndex = getFocusBlockActiveIndex(nextFocusBlock, -1)
      let focusableElement
      if (activeIndex > -1) {
        focusableElement = getFocusableElementInFocusBlock(
          nextFocusBlock,
          activeIndex,
          PositionType.Absolute
        )
      }
      if (!focusableElement) {
        focusableElement = getFirstFocusableElementInFocusBlock(nextFocusBlock)
      }
      if (focusableElement) {
        setFocus(focusableElement)
      }
    }
  }
  if (intercepted) {
    if (document.activeElement === document.body) {
      // Tab
    }
  }
}

/**
 * 聚焦事件Handler
 * @param {FocusEvent} evt 键盘事件
 */
function onFocusHandler() {
  setTimeout(() => {
    lastFocusElement?.focus()
  }, 60)
  hasFocusInView = true
}

/**
 * 失焦事件Handler
 * @param {Event} evt 键盘事件
 */
function onBlurHandler() {
  lastFocusElement = document.activeElement
  hasFocusInView = false
  hideFocusBox()
}

/**
 * 启动事件监听
 */
function setupEventListener() {
  document.addEventListener('keydown', onKeydownHandler, false)
  window.addEventListener('focus', onFocusHandler)
  window.addEventListener('blur', onBlurHandler)
}

export default function setup(enable = false) {
  cancelAnimationFrame(timer)
  if (enable) {
    setupFocusBox()
    setupEventListener()
    setupFocusCheck()
  }
}
