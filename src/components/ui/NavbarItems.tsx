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
  Spinner,
} from '@chakra-ui/react';
import { IconMenu, IconSearch } from '@/assets/icons';
import { InputGroup } from './input-group';
import { useNavigate } from 'react-router-dom';
import Ititle from './Ititle';
import './animation.css';
import { Toaster, toaster } from '@/components/ui/toaster';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { GoogleGenAI } from '@google/genai';
import { IProduct } from '@/constants/Global';

// const GeminiKey = import.meta.env.VITE_GEMINI_API_KEY;

const NavbarItems = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [findData, setFindData] = React.useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const { getAssessTokenFromLocalStorage, buildGeminiPrompt, getProducts } =
    React.useContext(RestfulApiContext);
  //   const AI = new GoogleGenAI({ apiKey: GeminiKey });
  const AI = new GoogleGenAI({
    apiKey: 'AIzaSyAs3aXFRBfhYveosTQfyB9VWIXuVnFtph8',
  });

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

  const handleProductClick = async (product: IProduct) => {
    setSearchActive(false);
    setNotFound(false);
    setSearchValue('');
    setFindData([]);
    setIsLoading(false);
    navigate(`/product/${product.id}/${product.prod_title}`, {
      state: { product },
    });
  };

  const callAI = async (prompt: string) => {
    await AI.models
      .generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      })
      .then((res: any) => {
        const rawText = res?.candidates[0]?.content?.parts[0]?.text;
        // console.log('Response:', rawText);
        const jsonText = rawText.replace(/```json|```/g, '').trim();
        const json = JSON.parse(jsonText);
        console.log('AI JSON res:', json);

        // Handle the parsed JSON as needed
        getProducts(
          {
            page: 1,
            ...json,
          },
          {},
          {}
        )
          .then((res: any) => {
            console.log('get products query:', {
              page: 1,
              ...json,
            });
            console.log('Response:', res);
            setFindData(res.data.results);
            if (res.data.results.length === 0) {
              setNotFound(true);
            } else {
              setNotFound(false);
            }
          })
          .catch((err: any) => {
            console.log('Error:', err);
            toaster.create({
              title: `AI Error:`,
              description: 'Failed to fetch AI response',
              type: 'error',
              duration: 2000,
            });
            setNotFound(false);
            return err;
          })
          .finally(() => {
            setIsLoading(false);
          });
        return json;
      })
      .catch((error) => {
        console.error('Error:', error);
        toaster.create({
          title: `AI Error:`,
          description: 'Failed to fetch AI response',
          type: 'error',
          duration: 2000,
        });
        return error;
      });
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (searchActive && searchValue) {
      timer = setTimeout(() => {
        setIsLoading(true);
        // Perform search action here
        // const sample = `Hi I want a red dress for my date and my date partner love old stuff`;
        const userPrompt = buildGeminiPrompt(searchValue);
        // const userPrompt = buildGeminiPrompt(sample);

        const sampleResponse = callAI(userPrompt).then((res) => {
          //   console.log('AI Response:', res);
          return res;
        });
        console.log('Sample Response:', sampleResponse);
      }, 500); // Adjust the delay as needed
    } else if (!searchActive) {
      // Reset search value when search is not active
      setSearchValue('');
      setFindData([]);
      setNotFound(false);
      setIsLoading(false);
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
            <InputGroup
              flex="1"
              startElement={
                !isLoading ? <IconSearch /> : <Spinner color={'black'} />
              }
            >
              <Input
                placeholder="Ask AI to find your product"
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
            <InputGroup
              flex="1"
              startElement={
                !isLoading ? <IconSearch /> : <Spinner color={'black'} />
              }
              border={'none'}
            >
              <Input
                placeholder="Ask AI to find your product"
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
                          w={'full'}
                          textAlign={'center'}
                          mt={5}
                          onClick={handleHomeClick}
                        >
                          SHOP
                        </Text>
                        {/* a line */}
                        <Box
                          borderBottomWidth={2}
                          borderColor="black"
                          w={'full'}
                          // px={16}
                        />
                        <Text
                          cursor="pointer"
                          color="black"
                          w={'full'}
                          textAlign={'center'}
                          onClick={handleAboutClick}
                        >
                          ABOUT
                        </Text>
                        <Box
                          borderBottomWidth={2}
                          borderColor="black"
                          w={'full'}
                          // px={16}
                        />
                        {getAssessTokenFromLocalStorage() ? (
                          <Text
                            cursor="pointer"
                            color="black"
                            w={'full'}
                            textAlign={'center'}
                            onClick={handleLogoutClick}
                          >
                            LOGOUT
                          </Text>
                        ) : (
                          <Text
                            cursor="pointer"
                            color="black"
                            w={'full'}
                            textAlign={'center'}
                            onClick={handleLoginClick}
                          >
                            LOGIN
                          </Text>
                        )}
                        {/* <Text
                          cursor="pointer"
                          color="black"
                          w={'full'}
                          textAlign={'center'}
                          onClick={() => {
                            setOpen(false);
                            navigate('/login');
                          }}
                        >
                          LOGIN
                        </Text> */}
                        <Box
                          borderBottomWidth={2}
                          borderColor="black"
                          w={'full'}
                          // px={16}
                        />
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
            bgColor={'white'}
          >
            {findData.map((item: IProduct, index: number) => (
              <Flex
                direction={'row'}
                // key={index}
                p={'8px'}
                overflow="hidden"
                bg={'background.1'}
                h={24}
                gap={5}
                alignItems={'center'}
                onClick={() => handleProductClick(item)}
                key={item.id}
              >
                <Image
                  src={item.image}
                  alt="Product"
                  height="full"
                  objectFit="cover"
                  aspectRatio={1 / 1}
                />
                <Flex direction={'column'}>
                  <Text fontWeight="medium" mb={1} color={'black'}>
                    {item.prod_title}
                  </Text>
                  <Text fontSize="xs" color="black">
                    {item.colour}
                  </Text>
                </Flex>
              </Flex>
            ))}
            {findData.length === 0 && notFound === true && (
              <Flex
                direction={'row'}
                // key={index}
                p={'8px'}
                overflow="hidden"
                bg={'background.1'}
                h={24}
                gap={5}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text fontWeight="medium" mb={1} color={'black'}>
                  No result found
                </Text>
              </Flex>
            )}
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
