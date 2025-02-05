import hyRequest from "@/service";
import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";

interface Obj {
  banners: IBanner[];
  code: number;
  message?: string;
}
interface IBanner {
  imageUrl: string;
  targetId: number;
  adid?: any;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: string;
  exclusive: boolean;
  monitorImpress?: any;
  monitorClick?: any;
  monitorType?: any;
  monitorImpressList?: any;
  monitorClickList?: any;
  monitorBlackList?: any;
  extMonitor?: any;
  extMonitorInfo?: any;
  adSource?: any;
  adLocation?: any;
  adDispatchJson?: any;
  encodeId: string;
  program?: any;
  event?: any;
  video?: any;
  song?: any;
  scm: string;
  bannerBizType: string;
}

interface IProps {
  children?: ReactNode;
}
const index: FC<IProps> = () => {
  return <div></div>;
};
export default memo(index);
