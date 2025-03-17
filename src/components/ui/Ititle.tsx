import React from 'react';
import { Text, TextProps } from '@chakra-ui/react';

export type ItitleProps = TextProps & {
  children: React.ReactNode;
};

const Ititle: React.FC<ItitleProps> = ({
  children,
  letterSpacing = '0.8em',
  ...props
}) => {
  return (
    <Text
      letterSpacing={letterSpacing}
      mr={`-${letterSpacing}`}
      fontWeight="medium"
      {...props}
    >
      {children}
    </Text>
  );
};

export default Ititle;
