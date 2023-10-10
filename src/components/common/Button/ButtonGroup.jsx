import React from 'react'
import classNames from 'classnames'
export const ButtonGroupContext = React.createContext({})
const ButtonGroup = ({
  children,
  className,
  mode = 'normal',
  size = 'default',
  type = 'primary',
  disabled = false,
}) => {
  return (
    <ButtonGroupContext.Provider value={{ mode, size, type, disabled }}>
      <div className={classNames(['button-group', `button-group--${size}`, className])}>
        {children}
      </div>
    </ButtonGroupContext.Provider>
  )
}

export default ButtonGroup
