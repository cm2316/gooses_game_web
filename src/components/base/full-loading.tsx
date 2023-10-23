import { Spin } from 'antd';

const FullLoading = () => {
  return (
    <Spin spinning={true}>
      <div className="w-screen h-screen" />
    </Spin>
  );
};

export default FullLoading;
