import { Button, Text } from '@chakra-ui/react';
import clsx from 'clsx';

type OptionProps = {
  text: string;
  handleClick: any;
  icon?: string;
  className: string;
  isDisabled: boolean;
};

const Option = ({
  text,
  icon = '',
  className,
  isDisabled,
  handleClick,
}: OptionProps) => {
  return (
    <Button
      variant={'outline'}
      className={clsx('text-right p-2 flex justify-between', className)}
      onClick={handleClick}
      isDisabled={isDisabled}
      _hover={{ colorScheme: 'none' }}
    >
      <Text>{icon}</Text>
      <Text className="font-quranic text-lg">{text}</Text>
    </Button>
  );
};

export default Option;
