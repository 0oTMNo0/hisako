import Navbar from '@/components/ui/Navbar';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex direction={'column'}>
      <Navbar />
      <Flex background={'#A18582'} h={'100vh'}>
        <Text>Login</Text>
        <Input placeholder="email" size="lg" />
        <Input placeholder="password" size="lg" />
        <Button size="xl">Button (xl)</Button>
      </Flex>
    </Flex>
  );
};

export default Login;
