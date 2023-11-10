import Quiz from "./components/Quiz";
import { useEffect, useState } from "react";
import { guessVerse } from "quran-quiz";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Select,
} from "@chakra-ui/react";

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

  async function getQuestion(): Promise<void> {
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
  }

  useEffect(() => {
    getQuestion();
    getSurahData();
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

  const scoreHandle = (optionValue: number) => {
    setScore(score + optionValue);
  };

  return (
    <ChakraProvider>
      <main className="min-w-full mt-5 flex flex-col gap-5 mb-5">
        <Card mx={{ base: "40px", sm: "auto" }} w={{ sm: "xl" }}>
          <CardHeader>
            <Heading size={"md"} textAlign={"center"} fontSize={{ sm: "2xl" }}>
              Selamat Datang di Website Quiz Hafalan Qur'an Sederhana
            </Heading>
          </CardHeader>
          <CardBody>
            <Text mb="8px" className="font-quranic text-center text-3xl">
              {surah[surahNumber - 1]?.name}
            </Text>
            <Text mb="8px" fontSize={{ sm: "lg" }}>
              Jumlah Soal: {amount}
            </Text>
            <NumberInput
              size="sm"
              maxW={20}
              defaultValue={1}
              min={1}
              allowMouseWheel
              onChange={(value) => {
                setAmount(Number(value));
              }}
              mb={"8px"}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              placeholder="Pilih Surah"
              mb={"8px"}
              className="font-quranic"
              onChange={(e) => setSurahNumber(Number(e.target.value))}
              fontSize={{ sm: "2xl" }}
              h={"fit-content"}
            >
              {surah?.map((surah, index) => (
                <option
                  className="font-quranic"
                  value={surah.number}
                  key={index}
                >
                  {surah.name}
                </option>
              ))}
            </Select>
            <Button
              colorScheme="teal"
              size={"sm"}
              width={"100px"}
              onClick={() => {
                getQuestion();
                setIsDisabled(false);
                setIsOptionClicked([false, false, false, false]);
                setCurrentQuestion(0);
                setScore(0);

                console.log(amount);
              }}
              isLoading={loading}
              fontSize={{ sm: "lg" }}
            >
              Set
            </Button>
          </CardBody>
        </Card>
        <Quiz
          questions={questions}
          options={options}
          nextHandleClick={nextHandleClick}
          currentQuestion={currentQuestion}
          isDisabled={isDisabled}
          isOptionClicked={isOptionClicked}
          resetOptionsClickedFunction={resetOptionsClicked}
          scoreHandleFunction={scoreHandle}
          score={score}
        />
      </main>
    </ChakraProvider>
  );
}

export default App;
