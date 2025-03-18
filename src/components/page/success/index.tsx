import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const msg = location.state?.msg || 'Default message';

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
        alignItems={'center'}
        justifyContent={'center'}
        background={'primary.500'}
        h={'full'}
      >
        <Flex
          direction={'column'}
          maxWidth={'breakpoint-sm'}
          px={50}
          w={'full'}
          alignItems={'center'}
        >
          <Text fontSize="xl" color={'black'} fontWeight={'bold'}>
            SUCCESS
          </Text>
          <Text
            onClick={() => navigate('/login/ResetPassword')}
            fontSize={'2xs'}
            color={'black'}
            mt={23}
            mb={35}
            cursor={'pointer'}
          >
            {msg}
          </Text>
          <Ibutton
            w={'full'}
            size="xl"
            bgColor={'secondary.500'}
            color={'white'}
            mb={15}
            onClick={() => navigate('/')}
          >
            CONTINUE
          </Ibutton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Success;
