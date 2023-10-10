import classNames from 'classnames'
import React from 'react'

import GameList from './GameList'

const AppList = ({ className, enable, title, titleId, headerRender, column = 6, row = 2 }) => {
  return (
    <GameList
      className={classNames([className])}
      imgPlaceholderClass='ratio-1-1'
      title={title}
      titleId={titleId}
      column={column}
      row={row}
      enable={enable}
      backIcon={true}
      headerRender={headerRender}
    />
  )
}

export default AppList
