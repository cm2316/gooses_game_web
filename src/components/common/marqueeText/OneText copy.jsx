import React, { PureComponent } from 'react'
import './index.scss'
// 跑马灯
const speed = 20
class Marquee extends PureComponent {
  constructor(props) {
    super(props)
    this.viewRef = React.createRef()
    this.textRef = React.createRef()
    this.child = [props.text || props.children]
  }
  componentDidMount = async () => {
    try {
      const { start, end, duration } = await this.isNeedToMove()
      this.move(duration, start, end)
    } catch (e) {
      /* empty */
    }
  }
  componentDidUpdate = async () => {
    try {
      const { start, end, duration } = await this.isNeedToMove()
      this.move(duration, start, end)
    } catch (e) {
      /* empty */
    }
  }
  isNeedToMove = () => {
    return new Promise((resolve, reject) => {
      const viewWidth = this.viewRef.current.getBoundingClientRect().width
      const textWidth = this.textRef.current.getBoundingClientRect().width
      const duration = Math.floor(textWidth / speed)
      if (textWidth > viewWidth) {
        const start = viewWidth
        const end = -Math.floor(textWidth)
        return resolve({ start, end, duration })
      } else {
        return reject('')
      }
    })
  }
  move(duration) {
    // this.setState({
    //   child:[React.cloneElement(this.child),React.cloneElement(this.child)]
    // })
    console.log(2)
    this.viewRef.current.style = `
            animation: oneTextAnimation ${duration}s linear infinite;
        `
  }
  render() {
    const { text, children } = this.props
    return (
      <div className='one-text-marquee-bar'>
        <div className='one-text-marquee-bar-view' ref={this.viewRef}>
          {this.child}
        </div>
        <div className='one-text-marquee-bar-text' ref={this.textRef}>
          {text || children}
        </div>
      </div>
    )
  }
}

export default Marquee
