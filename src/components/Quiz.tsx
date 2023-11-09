import { Card, Text } from '@chakra-ui/react';
import Option from './Option';
import clsx from 'clsx';

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
      <Card className="h-fit w-full shadow-md rounded-md p-2">
        <Text
          className={clsx('text-center font-bold', {
            hidden: currentQuestion > questions.length - 1,
          })}
        >
          {`Sambung Ayat ${currentQuestion + 1 + '/' + questions.length}`}
        </Text>
        <Text
          className={clsx('text-center font-bold', 'text-xl', {
            hidden: currentQuestion <= questions.length - 1,
          })}
        >
          {`Selesai, score anda : ${score}/${questions.length}`}
        </Text>
        <Text
          className={clsx('mt-5', 'text-right text-xl font-quranic', {
            hidden: currentQuestion > questions.length - 1,
          })}
        >
          {questions[currentQuestion]}
        </Text>
      </Card>
      <div
        className={clsx('flex flex-col gap-3', {
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
              colorScheme={clsx({
                green:
                  (isDisabled && option.value) ||
                  (isOptionClicked[index] && option.value),
                red: isOptionClicked[index] && !option.value,
              })}
              key={index}
            />
          )
        )}
      </div>
      <button
        className={clsx('bg-black text-white rounded-md py-1', {
          hidden: !isDisabled,
        })}
        onClick={nextHandleClick}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
      </button>
    </>
  );
};

export default Quiz;
