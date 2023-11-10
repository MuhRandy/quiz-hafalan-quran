import { Button, Card, Text } from "@chakra-ui/react";
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
  const optionHandleClick = (option: any, index: number) => {
    let newArr: boolean[] = [...isOptionClicked];
    newArr[index] = Boolean(true);
    resetOptionsClickedFunction(newArr);
    scoreHandleFunction(Number(option.value));
  };

  const fontSize = { sm: "lg" };

  return (
    <>
      <Card mx={{ base: "40px", sm: "auto" }} p={"8px"} w={{ sm: "xl" }}>
        <Text
          className={clsx("text-center font-bold", {
            hidden: currentQuestion > questions.length - 1,
          })}
          fontSize={fontSize}
        >
          {`Sambung Ayat ${currentQuestion + 1 + "/" + questions.length}`}
        </Text>
        <Text
          className={clsx("text-center font-bold", "text-xl", {
            hidden: currentQuestion <= questions.length - 1,
          })}
          fontSize={fontSize}
        >
          {`Selesai, score anda : ${score}/${questions.length}`}
        </Text>
        {/* Questions */}
        <Text
          mt={"20px"}
          textAlign={"right"}
          fontSize={{ base: "xl", sm: "2xl" }}
          className={clsx("font-quranic", {
            hidden: currentQuestion > questions.length - 1,
          })}
        >
          {questions[currentQuestion]}
        </Text>
        {/*  */}
      </Card>
      {/* Options */}
      <div
        className={clsx("flex flex-col gap-3 mx-10 min-[480px]:mx-0", {
          hidden: currentQuestion > questions.length - 1,
        })}
      >
        {options[currentQuestion]?.map(
          (option: { text: string; value: number }, index: number) => (
            <Option
              text={option.text}
              handleClick={() => optionHandleClick(option, index)}
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
      {/*  */}
      <Button
        variant={"solid"}
        backgroundColor={"black"}
        textColor={"white"}
        onClick={nextHandleClick}
        hidden={!isDisabled}
        _hover={{
          background: "white",
          outlineWidth: 1,
          outlineColor: "black",
          textColor: "black",
        }}
        w={"fit-content"}
        m={"auto"}
      >
        {currentQuestion < questions.length - 1 ? "Selanjutnya" : "Selesai"}
      </Button>
    </>
  );
};

export default Quiz;
