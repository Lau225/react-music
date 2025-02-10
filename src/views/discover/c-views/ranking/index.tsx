import React, { memo } from "react";
import type { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}
const index: FC<IProps> = () => {
  return (
    <div>
      <h1>1231231321233</h1>
    </div>
  );
};
export default memo(index);
