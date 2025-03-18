import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
  const navigate = useNavigate();
  const { testContext } = React.useContext(RestfulApiContext);

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
        h={'full'}
      >
        <Flex
          direction={'column'}
          maxWidth={'breakpoint-sm'}
          px={50}
          w={'full'}
          alignItems={'center'}
        >
          <Text fontSize="xl" color={'black'} mt={35}>
            RESET PASSWORD
          </Text>
          <Text fontSize={'2xs'} color={'black'} my={22}>
            ENTER EMAIL FOR RECOVERY INSTRUCTIONS
          </Text>
          <IInput placeholder="email" size="lg" mb={30} />
          <Ibutton
            w={'full'}
            size="xl"
            bgColor={'secondary.500'}
            color={'white'}
            mb={15}
            onClick={() => testContext()}
          >
            CONTINUE
          </Ibutton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetPass;
