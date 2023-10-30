'use client';
import { ShareAltOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useMemo } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import './share-buttons.scss';
export default function ShareButton() {
  const url = useMemo<string>(() => {
    if (typeof window !== 'undefined') {
      return `https://www.game520.online${window.location.pathname || '/'}`;
    }
    return '/';
  }, []);
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ bottom: 100 }}
        icon={<ShareAltOutlined />}
        className="share-buttons--container"
      >
        <LinkedinShareButton url={url}>
          <FloatButton icon={<LinkedinIcon size={32} round />} />
        </LinkedinShareButton>
        <TwitterShareButton url={url}>
          <FloatButton icon={<TwitterIcon size={32} round />} />
        </TwitterShareButton>
        <RedditShareButton url={url}>
          <FloatButton icon={<RedditIcon size={32} round />} />
        </RedditShareButton>
        <FacebookShareButton url={url}>
          <FloatButton icon={<FacebookIcon size={32} round />} />
        </FacebookShareButton>
      </FloatButton.Group>
      <FloatButton.BackTop />
    </>
  );
}
