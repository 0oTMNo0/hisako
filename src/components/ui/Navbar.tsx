import React from 'react';
import { Box, Text, Input, Button, Icon, Flex, Link } from '@chakra-ui/react';
import { IconSearch } from '@/assets/icons';
import { InputGroup } from './input-group';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Flex
      w="100%"
      py={4}
      px={6}
      boxShadow="sm"
      h={100}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      background={'white'}
    >
      <Flex
        direction={'row'}
        gap={15}
        alignItems={'center'}
        sm={{ display: 'flex' }}
        display={'none'}
      >
        {/* Desktop Navbar */}
        <Text fontSize="xl" fontWeight="bold" color={'red'}>
          HISAKO
        </Text>
        <Text cursor="pointer" color={'black'}>
          SHOP
        </Text>
        <Text cursor="pointer" color={'black'}>
          ABOUT
        </Text>

        <InputGroup flex="1" startElement={<IconSearch />}>
          <Input placeholder="Search contacts" />
        </InputGroup>
      </Flex>

      <Text
        fontSize="xl"
        fontWeight="bold"
        sm={{ display: 'none' }}
        display={'flex'}
        color={'black'}
      >
        HISAKO
      </Text>

      <Button onClick={() => navigate('/login')}>LOGIN</Button>
    </Flex>
  );
};

export default Navbar;
