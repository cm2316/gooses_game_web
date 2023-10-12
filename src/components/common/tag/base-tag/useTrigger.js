import { containerValueFinder } from '@/tool'
import { useEffect } from 'react'

import { emit } from '@/tool/EE'

export const useClose = (target) => {
  useEffect(() => {
    const _target = containerValueFinder(target)
    const onScroll = () => {
      emit('base-tag-close')
    }
    if (_target) {
      _target.addEventListener('scroll', onScroll, false)
    }
    return () => {
      _target && _target.removeEventListener('scroll', onScroll)
    }
  }, [])
}
