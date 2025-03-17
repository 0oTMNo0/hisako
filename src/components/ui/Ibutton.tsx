import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

// Create a type alias for Chakra UI's ButtonProps
export type ChakraBtnPropsType = ButtonProps;

// Extend ChakraBtnPropsType for our custom button if needed
export interface IButtonProps extends ChakraBtnPropsType {}

const Ibutton: React.FC<IButtonProps> = ({ children, ...props }) => {
  return (
    <Button {...props} fontSize={14} borderRadius={'none'}>
      {children}
    </Button>
  );
};

export default Ibutton;
