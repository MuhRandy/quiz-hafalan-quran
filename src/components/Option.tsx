import { Button, Text } from '@chakra-ui/react';
import clsx from 'clsx';

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
      variant={'outline'}
      className={clsx('text-right p-2', className)}
      onClick={handleClick}
      isDisabled={isDisabled}
      _hover={{ colorScheme: 'none' }}
      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
      height={'fit-content'}
      textAlign={'right'}
      colorScheme={colorScheme}
    >
      <Text className="font-quranic text-lg">{text}</Text>
    </Button>
  );
};

export default Option;
