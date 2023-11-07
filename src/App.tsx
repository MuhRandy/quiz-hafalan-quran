import Quiz from "./components/Quiz";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { guessVerse } from "quran-quiz";

function App() {
  const [amount, setAmount] = useState<number>(1);
  const [questions, setQuestions] = useState<string[] | null[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isOptionClicked, setIsOptionClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  async function getQuestion(): Promise<void> {
    const data = await guessVerse.bySurah({
      amount: Number(amount),
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

  const nextHandleClick = () => {
    setCurrentQuestion(currentQuestion + 1);
    setIsDisabled(false);
    setIsOptionClicked([false, false, false, false]);
  };

  const resetOptionsClicked = (arr: boolean[]) => {
    setIsOptionClicked(arr);
    setIsDisabled(true);
  };

  return (
    <main className="mx-10 mt-5 flex flex-col gap-5">
      <Card>
        <Card.Title title="Selamat Datang diwebsite Hafalan Qur'an Sederhana" />
        <Card.Text>
          <div className="flex justify-between">
            <span>Silahkan pilih jumlah soal :</span>
            <input
              type="number"
              name="amount"
              min={1}
              className="max-w-[35px] p-0 text-center"
              defaultValue={1}
              onChange={(e) => {
                setAmount(Number(e.target.value));
              }}
            />
          </div>
          <button
            onClick={() => {
              getQuestion();
              setIsDisabled(false);
              setIsOptionClicked([false, false, false, false]);
              setCurrentQuestion(0);

              console.log(amount);
            }}
            className="bg-black text-white px-3"
          >
            Set
          </button>
        </Card.Text>
      </Card>
      <Quiz
        questions={questions}
        options={options}
        nextHandleClick={nextHandleClick}
        currentQuestion={currentQuestion}
        isDisabled={isDisabled}
        isOptionClicked={isOptionClicked}
        resetOptionsClickedFunction={resetOptionsClicked}
      />
    </main>
  );
}

export default App;
