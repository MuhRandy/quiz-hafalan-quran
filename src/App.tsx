import { useEffect, useState } from "react";
import Card from "./components/Card";
import { guessVerse } from "quran-quiz";
import Option from "./components/Option";

function App() {
  const [question, setQuestion] = useState<string[] | null[]>([]);
  const [options, setOptions] = useState<any[]>([]);

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

  return (
    <main className="mx-10 mt-5 flex flex-col gap-5">
      <Card title="Sambung Ayat" text={question[0]} />
      <div className="flex flex-col gap-3">
        {options[0]?.map(
          (option: { text: string; value: number }, index: number) => (
            <Option text={option.text} value={option.value} key={index} />
          )
        )}
      </div>
    </main>
  );
}

export default App;
