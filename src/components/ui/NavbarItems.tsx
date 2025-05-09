import React from 'react';
import {
  Box,
  Text,
  Input,
  Button,
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
import './animation.css';
import { Toaster, toaster } from '@/components/ui/toaster';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { GoogleGenAI } from '@google/genai';

const NavbarItems = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const { getAssessTokenFromLocalStorage, buildGeminiPrompt } =
    React.useContext(RestfulApiContext);
  const AI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const handleAboutClick = () => {
    toaster.create({
      title: 'Coming Soon',
      description: ' This feature is not available yet',
      type: 'warning',
      duration: 2000,
    });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    // clear local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const callAI = async (prompt: string) => {
    await AI.models
      .generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      })
      .then((res) => {
        console.log('Response:', res);
        return res;
      })
      .catch((error) => {
        console.error('Error:', error);
        return error;
      });
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (searchActive && searchValue) {
      timer = setTimeout(() => {
        // Perform search action here
        const prompt = buildGeminiPrompt(searchValue);
        console.log('Gemini Prompt:', prompt);
        callAI(prompt)
          .then((res) => {
            console.log('AI Response:', res);
            // Handle the AI response here
          })
          .catch((error) => {
            console.error('Error calling AI:', error);
          });
      }, 500); // Adjust the delay as needed
    } else if (!searchActive) {
      // Reset search value when search is not active
      setSearchValue('');
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, searchActive]);

  return (
    <>
      <Flex background="background.1" py={5} px={30} justifyContent="center">
        <Toaster />
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
            <Text cursor="pointer" color="black" onClick={handleHomeClick}>
              SHOP
            </Text>
            <Text cursor="pointer" color="black" onClick={handleAboutClick}>
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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </InputGroup>
          </Flex>
          {getAssessTokenFromLocalStorage() ? (
            <Button onClick={handleLogoutClick}>LOGOUT</Button>
          ) : (
            <Button onClick={handleLoginClick}>LOGIN</Button>
          )}
        </Flex>

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
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
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
                        <Text
                          cursor="pointer"
                          color="black"
                          onClick={handleHomeClick}
                        >
                          SHOP
                        </Text>
                        <Text
                          cursor="pointer"
                          color="black"
                          onClick={handleAboutClick}
                        >
                          ABOUT
                        </Text>
                        <Text
                          cursor="pointer"
                          color="black"
                          onClick={() => {
                            setOpen(false);
                            navigate('/login');
                          }}
                        >
                          LOGIN
                        </Text>
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
    </>
  );
};

export default NavbarItems;
