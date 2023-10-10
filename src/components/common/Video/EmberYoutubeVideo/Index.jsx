import React from 'react'
import Image from '@/components/common/Image/Image'
import SvgIcon from '@/components/common/SvgIcon/SvgIcon'
import './index.scss'

const EmberYoutubeVideo = ({ src, posturl, onLoad }) => {
  return (
    <div className='ember-video-container'>
      {posturl ? (
        <div className='ember-video-container-posturl posturl-container'>
          <Image src={posturl} alt='posturl' onLoad={onLoad} />
          <div className='posturl-container-icon'>
            <SvgIcon icon='play-circle' />
          </div>
        </div>
      ) : (
        <div className='ember-iframe-container'>
          <iframe
            aria-hidden='true'
            tabIndex={-1}
            className='defaultImge'
            onLoad={onLoad}
            src={src}
            title={src}
            allowFullScreen
            frameBorder='0'
          />
        </div>
      )}
    </div>
  )
}

export default EmberYoutubeVideo
