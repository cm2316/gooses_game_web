'use client';
import { ExpandOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, Tooltip } from 'antd';
export default function BaseFooter() {
  const [fullscreen, { enterFullscreen }] = useFullscreen(() =>
    document.getElementById('PlayerContainer'),
  );
  return (
    <div className="flex justify-end items-center px-6 py-2 h-16 bg-white/90">
      <Tooltip title="Click Fullscreen Player">
        <Button
          type="text"
          shape="circle"
          icon={<ExpandOutlined />}
          onClick={enterFullscreen}
        ></Button>
      </Tooltip>
    </div>
  );
}
