import React from 'react';
import {
  Box,
  Text,
  Input,
  Button,
  Icon,
  Flex,
  IconButton,
  CloseButton,
  Drawer,
  Portal,
  Image,
  Grid,
} from '@chakra-ui/react';
import { IconMenu, IconSearch } from '@/assets/icons';
import { InputGroup } from './input-group';
import { useNavigate } from 'react-router-dom';
import Ititle from './Ititle';
import Footer from './Footer';
import './animation.css';

interface NavbarProps {
  children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);

  return (
    <div>
      <Flex background="background.1" py={5} px={30} justifyContent="center">
        {/* Desktop Navigation */}
        <Flex
          direction="row"
          w="full"
          alignItems="center"
          justifyContent="space-between"
          maxWidth={1200}
          display={{ base: 'none', sm: 'flex' }}
        >
          <Flex direction="row" gap={30} alignItems="center">
            <Ititle fontSize="xl" color="black">
              HISAKO
            </Ititle>
            <Text cursor="pointer" color="black">
              SHOP
            </Text>
            <Text cursor="pointer" color="black">
              ABOUT
            </Text>
            <InputGroup flex="1" startElement={<IconSearch />}>
              <Input
                placeholder="Search contacts"
                border="none"
                paddingInlineStart={51}
                color="black"
                pl={50}
                onFocus={() => setSearchActive(true)}
              />
            </InputGroup>
          </Flex>
          <Button onClick={() => navigate('/login')}>LOGIN</Button>
        </Flex>

        {/* Mobile Navigation */}
        {/* <Flex
          direction="row"
          w="full"
          alignItems="center"
          justifyContent="space-between"
          display={{ base: 'flex', sm: 'none' }}
        >
          <Drawer.Root
            open={open}
            onOpenChange={(e) => setOpen(e.open)}
            placement={'start'}
          >
            <Drawer.Trigger asChild>
              <IconButton
                aria-label="Open Menu"
                // icon={<IconSearch />}
                variant="solid"
              >
                <IconMenu />
              </IconButton>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content bg={'white'}>
                  <Drawer.Header>
                    <Drawer.Title>Menu</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Flex direction="column" gap={4}>
                      <Ititle fontSize="xl" color="black">
                        HISAKO
                      </Ititle>
                      <Text cursor="pointer" color="black">
                        SHOP
                      </Text>
                      <Text cursor="pointer" color="black">
                        ABOUT
                      </Text>
                      <InputGroup flex="1" startElement={<IconSearch />}>
                        <Input
                          placeholder="Search contacts"
                          border="none"
                          paddingInlineStart={51}
                          color="black"
                          pl={50}
                        />
                      </InputGroup>
                      <Button
                        onClick={() => {
                          setOpen(false);
                          navigate('/login');
                        }}
                      >
                        LOGIN
                      </Button>
                    </Flex>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </Drawer.Footer>
                  <Drawer.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Drawer.CloseTrigger>
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
          <Ititle fontSize="md" color="black" ml={3}>
            HISAKO
          </Ititle>
          <IconSearch />
        </Flex> */}
        {/* Mobile Navigation */}
        {searchActive ? (
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            // background="background.1"
            // bg={'red'}
            py={5}
            // px={30}
            display={{ base: 'flex', sm: 'none' }}
            data-state="open"
            _open={{
              animationName: 'fadeIn',
              animationDuration: '1300ms',
            }}
            _closed={{
              animationName: 'fadeOut',
              animationDuration: '1120ms',
            }}
            w="full"
          >
            <InputGroup flex="1" startElement={<IconSearch />} border={'none'}>
              <Input
                placeholder="WHAT ARE YOU LOOKING FOR?"
                border="none"
                borderWidth={'unset'}
                paddingInlineStart={51}
                color="black"
                pl={50}
                autoFocus
              />
            </InputGroup>
          </Flex>
        ) : (
          <Flex
            data-state="close"
            _open={{
              animationName: 'fadeIn',
              animationDuration: '1300ms',
            }}
            _closed={{
              animationName: 'fadeOut',
              animationDuration: '1120ms',
            }}
            direction="row"
            w="full"
            alignItems="center"
            justifyContent="space-between"
            display={{ base: 'flex', sm: 'none' }}
            background="background.1"
            py={5}
            // px={30}
          >
            <Drawer.Root
              open={open}
              onOpenChange={(e) => setOpen(e.open)}
              placement="start"
            >
              <Drawer.Trigger asChild>
                <IconButton aria-label="Open Menu" variant="solid">
                  <IconMenu />
                </IconButton>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content bg="white">
                    <Drawer.Header>
                      <Drawer.Title>Menu</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <Flex direction="column" gap={4}>
                        <Ititle fontSize="xl" color="black">
                          HISAKO
                        </Ititle>
                        <Text cursor="pointer" color="black">
                          SHOP
                        </Text>
                        <Text cursor="pointer" color="black">
                          ABOUT
                        </Text>
                        <InputGroup flex="1" startElement={<IconSearch />}>
                          <Input
                            placeholder="Search contacts"
                            border="none"
                            paddingInlineStart={51}
                            color="black"
                            pl={50}
                          />
                        </InputGroup>
                        <Button
                          onClick={() => {
                            setOpen(false);
                            navigate('/login');
                          }}
                        >
                          LOGIN
                        </Button>
                      </Flex>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                      </Button>
                    </Drawer.Footer>
                    <Drawer.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Drawer.CloseTrigger>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
            <Ititle fontSize="md" color="black" ml={3}>
              HISAKO
            </Ititle>
            <Box
              onClick={() => {
                setSearchActive(true);
              }}
              cursor="pointer"
            >
              <IconSearch />
            </Box>
          </Flex>
        )}
      </Flex>
      {searchActive && (
        <>
          {/* item list */}
          <Grid
            w={'full'}
            gap={2}
            zIndex={2}
            templateColumns={'1fr'}
            position={'absolute'}
            data-state="open"
            _open={{
              animationName: 'fadeIn',
              animationDuration: '1300ms',
            }}
            _closed={{
              animationName: 'fadeOut',
              animationDuration: '1120ms',
            }}
          >
            <Flex
              direction={'row'}
              // key={index}
              p={'8px'}
              overflow="hidden"
              bg={'background.1'}
              h={24}
              gap={5}
              alignItems={'center'}
              // onClick={handleProductClick}
            >
              <Image
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                alt="Product"
                height="full"
                objectFit="cover"
                aspectRatio={1 / 1}
              />
              <Flex direction={'column'}>
                <Text fontWeight="medium" mb={1} color={'black'}>
                  PRODUCT
                </Text>
                <Text fontSize="xs" color="black">
                  Size, colour
                </Text>
              </Flex>
            </Flex>
          </Grid>
          {/* Backdrop */}
          <Flex
            data-state="open"
            bg={'black/60'}
            w={'full'}
            position={'absolute'}
            h={'full'}
            // flex={'1'}
            onClick={() => setSearchActive(false)}
            zIndex={1}
            _open={{
              animationName: 'fadeIn',
              animationDuration: '1300ms',
            }}
            _closed={{
              animationName: 'fadeOut',
              animationDuration: '1120ms',
            }}
          ></Flex>
        </>
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Navbar;
