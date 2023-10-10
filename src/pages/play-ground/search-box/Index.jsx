import React, { useState } from 'react'
import { useDebounce } from 'ahooks'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import GameGridLayout from '@/components/layout/gameGridLayout/Index'
import { useGridBaseCount } from '@/hook/useViewport'
import './index.scss'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
const PlayGroundSearchBox = () => {
  const intl = useIntl()
  const [searchValue, setSearchValue] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const html5 = useSelector((state) => state.app.html5)
  const onInput = (evt) => {
    setSearchValue(evt.target.value)
  }
  const gridCount = useGridBaseCount()
  const debounceValue = useDebounce(searchValue, { wait: 500 })
  return (
    <div className='play-ground-search-box flex column'>
      <div className='search-box--section flex justifyCenter'>
        <label htmlFor='searchInput' className='search-box--input'>
          <SvgIcon size={1} icon='search' className='search-box--icon' />
          <input
            id='searchInput'
            type='text'
            autoComplete='off'
            placeholder={intl.formatMessage({ id: 'searchPlaceholder' })}
            onInput={onInput}
          />
        </label>
      </div>
      <div className='search-box--section'></div>
      <div className='search-box--section flex-1'>
        <GameGridLayout
          overscrollBehavior='none'
          gameItemProps={{
            imgPlaceholderClass: 'ratio-1-1',
          }}
          list={html5.filter((app) => app.game_name.includes(searchValue))}
          contentInnerClass={['margin-bottom-30']}
          columns={gridCount - 1}
          headerRender={() => null}
        />
      </div>
    </div>
  )
}

export default PlayGroundSearchBox
