import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '@/components/common/button/Index'
import ErrorIcon from './error.png'
import Utils from '@/Utils'

class ErrorFallback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorFallback', error)
    return {
      hasError: true,
    }
  }

  render() {
    const handleTryAgainClick = () => {
      if (this.props.onRefresh) {
        this.props.onRefresh()
      } else {
        Utils.handleReloadPage()
      }
    }

    const getFallbackComponent = () => {
      if (this.props.renderComponent) {
        return this.props.renderComponent()
      }
      return (
        <div className={`error-container`}>
          <img src={ErrorIcon} alt='' />
          <div className='loading-error-text margin-top-20'>
            <FormattedMessage id='loadingError'></FormattedMessage>
          </div>
          <Button
            type='primary'
            className='margin-top-20'
            titleId='refresh'
            onClick={() => handleTryAgainClick()}
          />
        </div>
      )
    }
    if (this.state.hasError) {
      return Utils.isDev() ? getFallbackComponent() : null
    }

    return this.props.children
  }
}
export default ErrorFallback
