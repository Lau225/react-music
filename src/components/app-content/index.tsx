import { Layout } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const Content: FC<IProps> = () => {
  const { Content } = Layout;
  return (
    <Content style={{ padding: "0 48px" }}>
      <div>Content</div>
    </Content>
  );
};
export default memo(Content);
