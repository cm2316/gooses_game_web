import { ExpandOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Button, LayoutProps, Tooltip } from 'antd';
import { JSX, RefAttributes } from 'react';
export default function BaseFooter(
  props: JSX.IntrinsicAttributes & LayoutProps & RefAttributes<HTMLElement>,
) {
  const [fullscreen, { enterFullscreen }] = useFullscreen(() =>
    document.getElementById('PlayerContainer'),
  );
  return (
    <div className="flex justify-end items-center px-6 py-2 opacity-80">
      <Tooltip title="Click Fullscreen Player" align={{ targetOffset: [0, 15] }}>
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
