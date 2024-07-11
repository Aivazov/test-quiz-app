import React from "react";

type Props = {
  handleFunc: () => void;
  btnName: string;
};

const GrayBtn: React.FC<Props> = ({ handleFunc, btnName }) => {
  return (
    <button
      onClick={handleFunc}
      className='bg-gray-500 text-white p-2 rounded-[5px]'
    >
      {btnName}
    </button>
  );
};

export default GrayBtn;
