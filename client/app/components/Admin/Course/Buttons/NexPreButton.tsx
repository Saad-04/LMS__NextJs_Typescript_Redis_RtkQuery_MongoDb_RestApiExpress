import React, { FC } from 'react';

const NexPreButton = ({ handleOptions, text }: any) => {
  return (
    <div
      className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
      onClick={() => handleOptions()}>
      {text}
    </div>
  );
};

export default NexPreButton;
