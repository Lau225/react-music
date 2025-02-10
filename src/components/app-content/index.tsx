import { Layout } from "antd";
import React, { memo, Suspense } from "react";
import type { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: ReactNode;
}
const Content: FC<IProps> = () => {
  const { Content } = Layout;
  return (
    <Content>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Content>
  );
};
export default memo(Content);
