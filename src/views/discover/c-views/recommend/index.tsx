import React, { memo } from "react";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const index: FC<IProps> = () => {
  return <div>index</div>;
};
export default memo(index);
