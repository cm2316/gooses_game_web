'use client';
import { ShareAltOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const url = `https://www.game520.online${pathname || '/'}`;
  console.log(url);
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
          <FloatButton icon={<LinkedinIcon size={40} round />} />
        </LinkedinShareButton>
        <TwitterShareButton url={url}>
          <FloatButton icon={<TwitterIcon size={40} round />} />
        </TwitterShareButton>
        <RedditShareButton url={url}>
          <FloatButton icon={<RedditIcon size={40} round />} />
        </RedditShareButton>
        <FacebookShareButton url={url}>
          <FloatButton icon={<FacebookIcon size={40} round />} />
        </FacebookShareButton>
      </FloatButton.Group>
      <FloatButton.BackTop />
    </>
  );
}
