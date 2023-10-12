import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class SvgIcon extends React.Component {
  static defaultProps = {
    iconSize: '1em',
    svgClass: 'svgIcon',
  }

  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
    style: PropTypes.object,
    on: PropTypes.object,
  }

  get iconSize() {
    const size = this.props.size
    const type = typeof size || 'middle'

    if ('string' === type) {
      if ('small' === size) {
        return '2em'
      } else if ('middle' === size) {
        return '2.67em'
      } else if ('large' === size) {
        return '3.33em'
      } else {
        return size
      }
    } else if ('number' === type) {
      return size + 'em'
    } else {
      return '1em'
    }
  }

  get iconName() {
    return `#goo-${this.props.icon}`
  }

  render() {
    const { svgClass, className, style, size, color, iconSize, on, disabled, ...attrs } = this.props
    const classNames = classnames(svgClass, className, { disabled })
    const events = disabled
      ? {}
      : Object.keys(on || {}).reduce((m, name) => {
          m[`on${name.charAt(0).toUpperCase() + name.slice(1)}`] = on[name]
          return m
        }, {})
    return (
      <svg
        {...attrs}
        {...events}
        className={classNames}
        style={{
          fill: color,
          width: this.iconSize,
          height: this.iconSize,
          pointerEvents: disabled ? 'none' : 'initial',
          ...style,
        }}
        aria-hidden='true'
      >
        <use xlinkHref={this.iconName}></use>
      </svg>
    )
  }
}

export default SvgIcon
