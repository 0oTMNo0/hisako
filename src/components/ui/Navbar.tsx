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
} from '@chakra-ui/react';
import { IconSearch } from '@/assets/icons';
import { InputGroup } from './input-group';
import { useNavigate } from 'react-router-dom';
import Ititle from './Ititle';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Flex h={92} background="background.1" px={30} justifyContent="center">
        <Flex
          direction="row"
          w="full"
          alignItems="center"
          justifyContent="space-between"
          maxWidth={1200}
        >
          {/* Desktop Navigation */}
          <Flex
            direction="row"
            gap={30}
            alignItems="center"
            display={{ base: 'none', sm: 'flex' }}
          >
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
          </Flex>

          {/* Mobile Navigation */}
          <Flex display={{ base: 'flex', sm: 'none' }} alignItems="center">
            <Drawer.Root
              open={open}
              onOpenChange={(e) => setOpen(e.open)}
              placement={'start'}
            >
              <Drawer.Trigger asChild>
                <IconButton
                  aria-label="Open Menu"
                  // icon={<IconSearch />}

                  variant="outline"
                >
                  111
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
            <Ititle fontSize="xl" color="black" ml={3}>
              HISAKO1
            </Ititle>
          </Flex>

          <Button onClick={() => navigate('/login')}>LOGIN</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
