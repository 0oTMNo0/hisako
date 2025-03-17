import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';

// Create a type alias for Chakra UI's InputProps
export type ChakraPropsType = InputProps;

// Extend ChakraPropsType for our custom input if needed
export interface IInputProps extends ChakraPropsType {}

const IInput: React.FC<IInputProps> = (props) => {
  return (
    <Input
      placeholder="email"
      size="lg"
      borderRadius={'none'}
      background={'background.1'}
      fontSize={14}
      color={'black'}
      {...props}
    />
  );
};

export default IInput;
