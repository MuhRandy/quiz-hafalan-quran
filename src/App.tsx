import { useEffect, useState } from "react";
import Card from "./components/Card";
import { guessVerse } from "quran-quiz";
import Option from "./components/Option";
import clsx from "clsx";

function App() {
  const [question, setQuestion] = useState<string[] | null[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  // const [icon, setIcon] = useState("");
  // const [className, setClassName] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOption1Clicked, setIsOption1Clicked] = useState(false);
  const [isOption2Clicked, setIsOption2Clicked] = useState(false);
  const [isOption3Clicked, setIsOption3Clicked] = useState(false);
  const [isOption4Clicked, setIsOption4Clicked] = useState(false);

  async function getQuestion() {
    const data = await guessVerse.bySurah({
      amount: 3,
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

  console.log(options[0]?.[0].text);
  return (
    <main className="mx-10 mt-5 flex flex-col gap-5">
      <Card title="Sambung Ayat" text={question[0]} />
      <div className={clsx("flex flex-col gap-3")}>
        <Option
          text={options[0]?.[0].text}
          handleClick={() => {
            setIsOption1Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption1Clicked
              ? options[0]?.[0].value
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "",
            { "bg-green-500 text-white": isDisabled && options[0]?.[0].value }
          )}
        />
        <Option
          text={options[0]?.[1].text}
          handleClick={() => {
            setIsOption2Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption2Clicked
              ? options[0]?.[1].value
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "",
            { "bg-green-500 text-white": isDisabled && options[0]?.[1].value }
          )}
        />
        <Option
          text={options[0]?.[2].text}
          handleClick={() => {
            setIsOption3Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption3Clicked
              ? options[0]?.[2].value
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "",
            { "bg-green-500 text-white": isDisabled && options[0]?.[2].value }
          )}
        />
        <Option
          text={options[0]?.[3].text}
          handleClick={() => {
            setIsOption4Clicked(true);
            setIsDisabled(true);
          }}
          isDisabled={isDisabled}
          className={clsx(
            isOption4Clicked
              ? options[0]?.[3].value
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
              : "",
            { "bg-green-500 text-white": isDisabled && options[0]?.[3].value }
          )}
        />
      </div>
    </main>
  );
}

export default App;
