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
  scoreHandleFunction: any;
  score: number;
};

const Quiz = ({
  questions,
  options,
  nextHandleClick,
  currentQuestion,
  isDisabled,
  isOptionClicked,
  resetOptionsClickedFunction,
  scoreHandleFunction,
  score,
}: QuizProps): JSX.Element => {
  return (
    <>
      <Card>
        <Card.Title
          className={clsx({
            hidden: currentQuestion > questions.length - 1,
          })}
          title={`Sambung Ayat ${currentQuestion + 1 + "/" + questions.length}`}
        />
        <Card.Title
          className={clsx("text-xl", {
            hidden: currentQuestion <= questions.length - 1,
          })}
          title={`Selesai, score anda : ${score}/${questions.length}`}
        />
        <Card.Text
          className={clsx("text-right text-xl font-quranic", {
            hidden: currentQuestion > questions.length - 1,
          })}
        >
          {questions[currentQuestion]}
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
                scoreHandleFunction(Number(option.value));
              }}
              isDisabled={isDisabled}
              className={clsx(
                isOptionClicked[index]
                  ? option.value
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "",
                {
                  "bg-green-500": isDisabled && option.value,
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
