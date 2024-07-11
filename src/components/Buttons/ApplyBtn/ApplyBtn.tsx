import React from "react";

type Props = {
  btnName: string;
};

const ApplyBtn: React.FC<Props> = ({ btnName }) => {
  return (
    <button type='submit' className='bg-green-500 text-white p-2 rounded-[5px]'>
      {btnName}
    </button>
  );
};

export default ApplyBtn;
