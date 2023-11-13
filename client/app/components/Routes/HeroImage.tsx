import Image from "next/image";
import React, { FC } from "react";

interface Props {
    srcData:string
}

const HeroImage :FC<Props>= ({srcData}) => {
  return (
    <Image
      src={srcData}
      alt=""
      width={50}
      height={50}
      className="rounded-full ml-[-20px]"
    />
  );
};

export default HeroImage;
