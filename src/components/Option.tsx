import { useState } from "react";

type OptionProps = {
  text: string;
  value: number;
};

const Option = ({ text, value }: OptionProps) => {
  const [icon, setIcon] = useState("");

  const handleClick = (value: number) => (value ? setIcon("✔") : setIcon("❌"));

  return (
    <button
      className="shadow-sm border rounded-md text-right p-2 flex justify-between"
      onClick={() => handleClick(value)}
    >
      <span>{icon}</span>
      <span className="font-quranic">{text}</span>
    </button>
  );
};

export default Option;
