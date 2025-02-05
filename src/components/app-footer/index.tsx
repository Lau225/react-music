import { Layout } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const footer: FC<IProps> = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
export default memo(footer);
