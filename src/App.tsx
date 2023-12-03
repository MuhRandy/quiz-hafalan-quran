import Quiz from "./components/Quiz";
import { createContext, useContext, useEffect, useState } from "react";
import { guessVerse } from "quran-quiz";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import QuizOpening from "./components/QuizOpening";

type AppContent = {
  surah: any[] | null[];
  amount: number;
  surahNumber: number;
  questions: string[] | null[];
  options: any[];
  score: number;
  currentQuestion: number;
  isDisabled: boolean;
  isOptionClicked: boolean[];
  loading: boolean;
  setSurah: (surah: any[]) => void;
  setAmount: (amount: number) => void;
  setSurahNumber: (surahNumber: number) => void;
  setQuestions: (questions: string[]) => void;
  setOptions: (options: any[]) => void;
  setScore: (score: number) => void;
  setCurrentQuestion: (currentQuestion: number) => void;
  setIsDisabled: (isDisabled: boolean) => void;
  setIsOptionClicked: (isOptionClicked: boolean[]) => void;
  setLoading: (loading: boolean) => void;
};

const AppContext = createContext<AppContent>({
  surah: [],
  amount: 1,
  surahNumber: 1,
  questions: [],
  options: [],
  score: 0,
  currentQuestion: 0,
  isDisabled: false,
  isOptionClicked: [false, false, false, false],
  loading: true,
  setSurah: () => {},
  setAmount: () => {},
  setSurahNumber: () => {},
  setQuestions: () => {},
  setOptions: () => {},
  setScore: () => {},
  setCurrentQuestion: () => {},
  setIsDisabled: () => {},
  setIsOptionClicked: () => {},
  setLoading: () => {},
});

export const useAppContext = () => useContext(AppContext);

function App() {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");
  const [surah, setSurah] = useState<any[] | null[]>([]);
  const [amount, setAmount] = useState<number>(1);
  const [surahNumber, setSurahNumber] = useState<number>(1);
  const [questions, setQuestions] = useState<string[] | null[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isOptionClicked, setIsOptionClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const getSurahData = () => {
    const API_URL = "http://api.alquran.cloud/v1/surah";
    axios
      .get(API_URL)
      .then(({ data }) => {
        setSurah(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  };

  const getQuestion = async (): Promise<void> => {
    const data = await guessVerse.bySurah({
      amount: Number(amount),
      select: [surahNumber],
    });

    const arrQuestions: string[] = [];
    const arrOptions: any[] = [];

    for (let i = 0; i < data.data.length; i++) {
      arrQuestions.push(data.data[i].question);
      arrOptions.push(data.data[i].options);
    }
    setQuestions(arrQuestions);
    setOptions(arrOptions);
  };

  useEffect(() => {
    getQuestion();
    getSurahData();
  }, []);

  return (
    <ChakraProvider>
      <AppContext.Provider
        value={{
          surah,
          amount,
          surahNumber,
          questions,
          options,
          score,
          currentQuestion,
          isDisabled,
          isOptionClicked,
          loading,
          setSurah,
          setAmount,
          setSurahNumber,
          setQuestions,
          setOptions,
          setScore,
          setCurrentQuestion,
          setIsDisabled,
          setIsOptionClicked,
          setLoading,
        }}
      >
        <main className="min-w-full mt-5 flex flex-col gap-5 mb-5">
          <QuizOpening getQuestion={getQuestion} />
          <Quiz />
        </main>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
