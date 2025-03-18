import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();

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
            CREATE ACCOUNT
          </Text>
          <IInput placeholder="email" size="lg" mb={30} />
          <IInput placeholder="password" size="lg" mb={15} />
          <Text fontSize={'2xs'} color={'black'} mb={15}>
            CONFIRM PASSWORD
          </Text>
          <IInput placeholder="password" size="lg" mb={35} />
          <Ibutton
            w={'full'}
            size="xl"
            bgColor={'secondary.500'}
            color={'white'}
            mb={15}
          >
            CREATE ACCOUNT
          </Ibutton>
          <Text
            fontSize={'2xs'}
            color={'white'}
            cursor={'pointer'}
            mb={35}
            onClick={() => navigate('/login')}
          >
            I already have account
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateAccount;
