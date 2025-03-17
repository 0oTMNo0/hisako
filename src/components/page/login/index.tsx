import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const Login = () => {
  return (
    <Flex direction={'column'} h={'100vh'} background={'background.1'}>
      {/* header */}
      <Flex
        w="100%"
        h={92}
        alignItems={'center'}
        justifyContent={'center'}
        background={'background.1'}
      >
        <Ititle fontSize="xl" color={'black'}>
          HISAKO
        </Ititle>
      </Flex>

      <Flex
        // alignItems={'center'}
        justifyContent={'center'}
        background={'primary.500'}
        h={'3/5'}
      >
        <Flex
          direction={'column'}
          maxWidth={'breakpoint-sm'}
          px={50}
          w={'full'}
          alignItems={'center'}
        >
          <Text fontSize="xl" color={'black'} my={35}>
            Login
          </Text>
          <IInput placeholder="email" size="lg" mb={30} />
          <IInput placeholder="password" size="lg" mb={15} />
          <Text fontSize={'2xs'} color={'black'} mb={35}>
            FORGOTTEN PASSWORD?
          </Text>
          <Ibutton
            w={'full'}
            size="xl"
            bgColor={'secondary.500'}
            color={'white'}
            mb={15}
          >
            SIGN IN
          </Ibutton>
          <Text fontSize={'2xs'} color={'white'} mb={35}>
            CREATE NEW ACCOUNT
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
