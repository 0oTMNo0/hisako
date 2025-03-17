import React from 'react';
import { Box, Text, Input, Button, Icon, Flex, Link } from '@chakra-ui/react';
import { IconSearch } from '@/assets/icons';
import { InputGroup } from './input-group';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import Ititle from './Ititle';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex h={92} background={'background.1'} px={30} justifyContent={'center'}>
      <Flex
        direction={'row'}
        w={'full'}
        alignItems={'center'}
        justifyContent={'space-between'}
        maxWidth={1200}
      >
        <Flex
          direction={'row'}
          gap={30}
          alignItems={'center'}
          sm={{ display: 'flex' }}
          display={'none'}
        >
          <Ititle fontSize="xl" color={'black'}>
            HISAKO
          </Ititle>
          <Text cursor="pointer" color="black">
            SHOP
          </Text>
          <Text cursor="pointer" color={'black'}>
            ABOUT
          </Text>

          <InputGroup flex="1" startElement={<IconSearch />}>
            <Input
              placeholder="Search contacts"
              border={'none'}
              paddingInlineStart={51}
              color={'black'}
              pl={50}
            />
          </InputGroup>
        </Flex>

        <Ititle
          fontSize="xl"
          sm={{ display: 'none' }}
          display={'flex'}
          color={'black'}
        >
          HISAKO1
        </Ititle>

        <Button onClick={() => navigate('/login')}>LOGIN</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
