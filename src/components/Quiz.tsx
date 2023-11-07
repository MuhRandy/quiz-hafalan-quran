import { useEffect, useState } from 'react';
import Card from './Card';
import { guessVerse } from 'quran-quiz';
import Option from './Option';
import clsx from 'clsx';

const quiz = () => {
  const [questions, setQuestions] = useState<string[] | null[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [options, setOptions] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isOptionClicked, setIsOptionClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  async function getQuestion() {
    const data = await guessVerse.bySurah({
      amount: 10,
      select: [113, 114],
    });

    const arrQuestions: string[] = [];
    const arrOptions: any[] = [];

    for (let i = 0; i < data.data.length; i++) {
      arrQuestions.push(data.data[i].question);
      arrOptions.push(data.data[i].options);
    }
    setQuestions(arrQuestions);
    setOptions(arrOptions);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      <Card>
        <Card.Title title="Sambung Ayat" />
        <Card.Text className="text-right text-xl font-quranic">
          {currentQuestion <= questions.length - 1
            ? questions[currentQuestion]
            : 'Selesai'}
        </Card.Text>
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
                setIsOptionClicked(newArr);
                setIsDisabled(true);
              }}
              isDisabled={isDisabled}
              className={clsx(
                isOptionClicked[index]
                  ? option.value
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : '',
                {
                  'bg-green-500 text-white': isDisabled && option.value,
                }
              )}
            />
          )
        )}
      </div>
      <button
        className={clsx('bg-black text-white rounded-md py-1', {
          hidden: !isDisabled,
        })}
        onClick={() => {
          setCurrentQuestion(currentQuestion + 1);
          setIsDisabled(false);
          setIsOptionClicked([false, false, false, false]);
        }}
      >
        {currentQuestion < questions.length - 1 ? 'Next' : 'Complete'}
      </button>
    </>
  );
};

export default quiz;
