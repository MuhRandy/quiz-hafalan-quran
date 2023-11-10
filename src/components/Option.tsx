import { Button, Text } from "@chakra-ui/react";

type OptionProps = {
  text: string;
  handleClick: any;
  className?: string;
  isDisabled: boolean;
  colorScheme: string;
};

const Option = ({
  text,
  className,
  isDisabled,
  handleClick,
  colorScheme,
}: OptionProps) => {
  return (
    <Button
      variant={"outline"}
      p={"2"}
      className={className}
      onClick={handleClick}
      isDisabled={isDisabled}
      _hover={{}}
      _disabled={{ cursor: "not-allowed" }}
      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
      height={"fit-content"}
      textAlign={"right"}
      colorScheme={colorScheme}
      w={{ sm: "xl" }}
      mx={{ base: "0", sm: "auto" }}
    >
      <Text className="font-quranic" fontSize={{ base: "lg", sm: "xl" }}>
        {text}
      </Text>
    </Button>
  );
};

export default Option;
