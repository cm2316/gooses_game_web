import { useRef, useEffect, useState } from 'react'
import { containerValueFinder } from '@/tool'
import { usePxToPx } from '@/hook/useViewport'
const _bottomTop = { bottom: 300, top: 100 }
const Scrollload = ({
  // 总数居
  list = [],
  // 一次加载条目
  numberOfItems = 6,
  // 子组件渲染函数
  render,
  // 滚动容器
  scrollContainer,
  // 加载阈值
  bottomTop = _bottomTop,
}) => {
  const [pageNum, setPageNum] = useState(1)
  const observerRef = useRef(null)

  const pageSize = numberOfItems
  // 显示的条目
  const showList = list.slice(0, pageNum * pageSize)
  // 是否已经加载完
  const isLoadFinished = list.length === showList.length

  const clearFn = () => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }

  const scrollTopLoad = usePxToPx(bottomTop.bottom)
  useEffect(() => {
    return clearFn
  }, [])

  // 注册事件
  useEffect(() => {
    const observeDom = containerValueFinder(scrollContainer)
    // 加载函数
    const observerCallback = () => {
      if (!observeDom.clientHeight) {
        return
      }
      const containerHeight = observeDom.clientHeight //获取可见区域高度
      const scrollHight = observeDom.scrollHeight //获取全文高度
      const scrollTop = observeDom.scrollTop //获取被卷去的高度
      const hasScrollBar = scrollHight - containerHeight > 0
      if (scrollHight - scrollTop - containerHeight <= scrollTopLoad) {
        setPageNum((page) => page + 1)
      }
      if (hasScrollBar) {
        clearFn()
      }
    }
    if (!isLoadFinished && observeDom) {
      observerRef.current = new MutationObserver(observerCallback)
      observerRef.current.observe(observeDom, { attributes: true, childList: true, subtree: true })
      observeDom.addEventListener('scroll', observerCallback)
      observerCallback()
    }
    return () => {
      clearFn()
      observeDom && observeDom.removeEventListener('scroll', observerCallback)
    }
  }, [scrollTopLoad, isLoadFinished, scrollContainer])
  return render(showList, pageSize)
}

export default Scrollload
