import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React from 'react';
import IInput from './Iinput';
import { InputGroup } from './input-group';

const Footer = () => {
  return (
    <Flex bg={'background.1'} px={30} justifyContent={'center'} pt={10}>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        maxWidth={1200}
        gap={5}
      >
        <GridItem colSpan={{ base: 1, md: 2, lg: 2 }}>
          <Text color={'black'} fontSize={36} fontWeight={'medium'}>
            Sign up for our newsletter
          </Text>
          <Text mt={3} fontSize={14} color={'black'}>
            Be the first to know about our special offers, new product launches,
            and events
          </Text>
          <InputGroup
            my={5}
            endElement={
              <Text fontWeight={'medium'} color={'black'}>
                Sign Up
              </Text>
            }
            w={'full'}
          >
            <IInput />
          </InputGroup>
        </GridItem>
        <GridItem colSpan={1}>
          <Text fontWeight={'medium'} color={'black'} fontSize={16} mb={5}>
            Shop
          </Text>
          <ul>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Women’s
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Men’s
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Kids’
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Shoes
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Equipment
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              By Activity
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Gift Cards
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Sale
            </Text>
          </ul>
        </GridItem>
        <GridItem colSpan={1}>
          <Text fontWeight={'medium'} color={'black'} fontSize={16} mb={5}>
            Help
          </Text>
          <ul>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Help Center
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Order Status
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Size Chart
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Returns & Warranty
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Contact Us
            </Text>
          </ul>
        </GridItem>
        <GridItem colSpan={1}>
          <Text fontWeight={'medium'} color={'black'} fontSize={16} mb={5}>
            About
          </Text>
          <ul>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              About Us
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Responsibility
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Technology & Innovation
            </Text>
            <Text mb={1} as={'li'} color={'gray'} fontSize={16}>
              Explore our stories
            </Text>
          </ul>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Footer;
