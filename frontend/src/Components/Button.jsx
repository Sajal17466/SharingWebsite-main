import React from "react";
export default function Button(buttonProps) {
  return (
    <div>
      <button
        className="py-[10px] px-[50px] rounded-lg back text-white font-bold text-[20px] lg:text-[25px]"
        onClick={buttonProps.functionName}
      >
        <div className="flex items-center">{buttonProps.Name}</div>
      </button>
    </div>
  );
}
