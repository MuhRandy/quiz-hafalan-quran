import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
} from "@chakra-ui/react";
import { useAppContext } from "../App";

type QuizOpeningProps = {
  getQuestion: () => Promise<void>;
};

const QuizOpening = ({ getQuestion }: QuizOpeningProps) => {
  // get state from App
  const {
    surah,
    surahNumber,
    amount,
    loading,
    setAmount,
    setSurahNumber,
    setIsDisabled,
    setIsOptionClicked,
    setCurrentQuestion,
    setScore,
  } = useAppContext();

  return (
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
            <option className="font-quranic" value={surah.number} key={index}>
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
  );
};

export default QuizOpening;
