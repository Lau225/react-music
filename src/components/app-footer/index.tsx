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
      <span style={{ color: "#666666", fontSize: "12px" }}>
        网易公司版权所有©1997-2025杭州乐读科技有限公司运营：浙网文[2024]
        0900-042号 浙公网安备 33010802013307号 算法服务公示信息
      </span>
    </Footer>
  );
};
export default memo(footer);
