import React from 'react';
import { Box, Text, Input, Button, Icon } from '@chakra-ui/react';
// import { SearchIcon } from '@chakra-ui/icons';
import { HiHeart } from 'react-icons/hi';
import { Search2Icon } from '@chakra-ui/icons';
import { IconSearch } from '@/assets/icons';

const Navbar = () => {
  return (
    <Box w="100%" py={4} px={6} boxShadow="sm" h={100}>
      {/* Desktop Navbar */}
      <Text fontSize="xl" fontWeight="bold">
        HISAKO
      </Text>
      <Text cursor="pointer">SHOP</Text>
      <Text cursor="pointer">ABOUT</Text>
      <Icon size="lg" color="pink.700">
        {/* <SearchIcon /> */}
        {/* <Search2Icon /> */}
        <IconSearch />
      </Icon>
      {/* <Input placeholder="SEARCH" variant="outline" size="sm" /> */}

      <Button variant="ghost">LOGIN</Button>
    </Box>
  );
};

export default Navbar;
