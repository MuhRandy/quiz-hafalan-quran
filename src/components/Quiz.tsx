import Card from "./Card";
import Option from "./Option";
import clsx from "clsx";

type QuizProps = {
  questions: string[] | null[];
  options: any[];
  nextHandleClick: any;
  currentQuestion: number;
  isDisabled: boolean;
  isOptionClicked: boolean[];
  resetOptionsClickedFunction: any;
};

const Quiz = ({
  questions,
  options,
  nextHandleClick,
  currentQuestion,
  isDisabled,
  isOptionClicked,
  resetOptionsClickedFunction,
}: QuizProps): JSX.Element => {
  return (
    <>
      <Card>
        <Card.Title title="Sambung Ayat" />
        <Card.Text className="text-right text-xl font-quranic">
          {currentQuestion <= questions.length - 1
            ? questions[currentQuestion]
            : "Selesai"}
        </Card.Text>
      </Card>
      <div
        className={clsx("flex flex-col gap-3", {
          hidden: currentQuestion > questions.length - 1,
        })}
      >
        {options[currentQuestion]?.map(
          (option: { text: string; value: number }, index: number) => (
            <Option
              text={option.text}
              handleClick={() => {
                let newArr: boolean[] = [...isOptionClicked];
                newArr[index] = Boolean(true);
                resetOptionsClickedFunction(newArr);
              }}
              isDisabled={isDisabled}
              className={clsx(
                isOptionClicked[index]
                  ? option.value
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "",
                {
                  "bg-green-500 text-white": isDisabled && option.value,
                }
              )}
              key={index}
            />
          )
        )}
      </div>
      <button
        className={clsx("bg-black text-white rounded-md py-1", {
          hidden: !isDisabled,
        })}
        onClick={nextHandleClick}
      >
        {currentQuestion < questions.length - 1 ? "Next" : "Complete"}
      </button>
    </>
  );
};

export default Quiz;
