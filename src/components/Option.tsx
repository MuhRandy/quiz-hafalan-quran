import clsx from "clsx";
// import { useState } from "react";

type OptionProps = {
  text: string;
  handleClick: any;
  icon?: string;
  className: string;
  //   value: number;
  isDisabled: boolean;
};

const Option = ({
  text,
  icon = "",
  className,
  isDisabled,
  handleClick,
}: OptionProps) => {
  return (
    <button
      className={clsx(
        "shadow-sm border rounded-md text-right p-2 flex justify-between",
        className
      )}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <span>{icon}</span>
      <span className="font-quranic">{text}</span>
    </button>
  );
};

export default Option;
