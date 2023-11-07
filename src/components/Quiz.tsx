import { useEffect, useState } from 'react';
import Card from './Card';
import { guessVerse } from 'quran-quiz';
import Option from './Option';
import clsx from 'clsx';

const quiz = () => {
  const [question, setQuestion] = useState<string[] | null[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [options, setOptions] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isOption1Clicked, setIsOption1Clicked] = useState<boolean>(false);
  const [isOption2Clicked, setIsOption2Clicked] = useState<boolean>(false);
  const [isOption3Clicked, setIsOption3Clicked] = useState<boolean>(false);
  const [isOption4Clicked, setIsOption4Clicked] = useState<boolean>(false);

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
    setQuestion(arrQuestions);
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
          {currentQuestion <= question.length - 1
            ? question[currentQuestion]
            : 'Selesai'}
        </Card.Text>
      </Card>
      <div
        className={clsx('flex flex-col gap-3', {
          hidden: currentQuestion > question.length - 1,
        })}
      >
        <Option
          text={options[currentQuestion]?.[0].text}
          handleClick={() => {
            setIsOption1Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption1Clicked
              ? options[currentQuestion]?.[0].value
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : '',
            {
              'bg-green-500 text-white':
                isDisabled && options[currentQuestion]?.[0].value,
            }
          )}
        />
        <Option
          text={options[currentQuestion]?.[1].text}
          handleClick={() => {
            setIsOption2Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption2Clicked
              ? options[currentQuestion]?.[1].value
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : '',
            {
              'bg-green-500 text-white':
                isDisabled && options[currentQuestion]?.[1].value,
            }
          )}
        />
        <Option
          text={options[currentQuestion]?.[2].text}
          handleClick={() => {
            setIsOption3Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption3Clicked
              ? options[currentQuestion]?.[2].value
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : '',
            {
              'bg-green-500 text-white':
                isDisabled && options[currentQuestion]?.[2].value,
            }
          )}
        />
        <Option
          text={options[currentQuestion]?.[3].text}
          handleClick={() => {
            setIsOption4Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption4Clicked
              ? options[currentQuestion]?.[3].value
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : '',
            {
              'bg-green-500 text-white':
                isDisabled && options[currentQuestion]?.[3].value,
            }
          )}
        />
      </div>
      <button
        className={clsx('bg-black text-white rounded-md py-1', {
          hidden: !isDisabled,
        })}
        onClick={() => {
          setCurrentQuestion(currentQuestion + 1);
          setIsDisabled(false);
          setIsOption1Clicked(false);
          setIsOption2Clicked(false);
          setIsOption3Clicked(false);
          setIsOption4Clicked(false);
        }}
      >
        {currentQuestion < question.length - 1 ? 'Next' : 'Complete'}
      </button>
    </>
  );
};

export default quiz;
