type CardProps = {
  title: string;
  text: string | null;
};

const Card = ({ title, text }: CardProps) => {
  return (
    <div className="h-fit w-full shadow-md rounded-md p-2">
      <div className="text-center font-bold">{title}</div>
      <p className="text-right mt-5 font-quranic text-xl">{text}</p>
    </div>
  );
};

export default Card;
