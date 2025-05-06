import React from 'react';
import { Input, InputProps } from '@chakra-ui/react';

// Create a type alias for Chakra UI's InputProps
export type ChakraPropsType = InputProps;

// Extend ChakraPropsType for our custom input if needed
export interface IInputProps extends ChakraPropsType {
  error?: boolean;
}

const IInput: React.FC<IInputProps> = ({ error, ...props }) => {
  return (
    <Input
      placeholder="email"
      size="lg"
      borderRadius={'none'}
      background={'background.1'}
      fontSize={14}
      color={'black'}
      borderColor={error ? 'red' : 'none'}
      {...props}
    />
  );
};

export default IInput;
