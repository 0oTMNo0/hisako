import { IconLove, IconMenu } from '@/assets/icons';
import Ibutton from '@/components/ui/Ibutton';
import Ititle from '@/components/ui/Ititle';
import { IProduct } from '@/constants/Global';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toaster, toaster } from '@/components/ui/toaster';

const Product = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const product: IProduct | undefined = state.product;
  const [apiCall, setApiCall] = React.useState(0);
  const [simData, setSimData] = React.useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { getProducts, handleTokenExist } = React.useContext(RestfulApiContext);

  const handleProductClick = async (product: IProduct) => {
    navigate(`/product/${product.id}/${product.prod_title}`, {
      state: { product },
    });
  };

  /**
   * Open Google Lens in a new tab to search by the product's image URL.
   */
  const searchWithGoogleLens = (): void => {
    if (!product?.image) {
      console.error('No image URL available for Google Lens search.');
      return;
    } else {
      const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(
        product?.image
      )}`;
      window.open(lensUrl, '_blank');
    }
  };

  const callData = () => {
    setIsLoading(true);
    getProducts({ page: 1, subcategory: product?.subcategory }, {}, {})
      .then((res: any) => {
        console.log('Response:', res);
        setSimData([...res.data.results].slice(0, 8));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (apiCall == 0) {
      // console.log('apiCall:', apiCall);
      handleTokenExist()
        .then((res: any) => {
          if (res) {
            setApiCall(1);
            console.log('token exist');
          } else {
            navigate('/login');
          }
        })
        .catch((err: any) => {
          console.log('Error:', err);
          navigate('/login');
        });
    }
  }, [apiCall]);

  React.useEffect(() => {
    if (apiCall > 0) {
      callData();
    }
  }, [apiCall]);

  return (
    <Flex direction={'column'} bg={'background.1'}>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
        }}
      >
        <GridItem colSpan={1} p={{ base: 0, md: 30 }}>
          <Image
            src={product?.image}
            alt={`Product ${1}`}
            width="full"
            height="full"
            w={{ base: 'full', md: 500 }}
            h={{ base: 'auto', md: 550 }}
            objectFit="cover"
            // draggable={false}
          />
        </GridItem>
        <GridItem colSpan={1} p={{ base: 0, md: 30 }}>
          <Flex
            w={'full'}
            h={'full'}
            justifyContent="center"
            direction={'column'}
            p={30}
          >
            <Ititle fontSize={24} mb={14} color={'black'}>
              {name}
            </Ititle>
            <Text mb={6} color={'black'}>
              The {product?.prod_title} is a standout piece in our
              {product?.subcategory}
              collection, thoughtfully designed for {product?.usage}. Crafted
              with attention to detail and lasting comfort in mind, it combines
              style and function so you can look—and feel—your best wherever
              your day takes you. You can expect to pay around {product?.price},
              making it an exceptional value for the quality and versatility it
              delivers.
            </Text>
            <Flex gap={{ base: 10, sm: 5 }}>
              <Ibutton
                bg={'primary.500'}
                flex={1}
                onClick={searchWithGoogleLens}
              >
                BUY NOW
              </Ibutton>
              <IconButton
                variant="outline"
                size={'md'}
                rounded={0}
                onClick={() => {
                  toaster.create({
                    title: 'Coming Soon',
                    description: ' This feature is not available yet',
                    type: 'warning',
                    duration: 2000,
                  });
                }}
              >
                <IconLove />
              </IconButton>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
      <Box px={30}>
        <Heading
          mb={6}
          mt={50}
          fontSize={{ base: 'lg', md: '2xl' }}
          color={'black'}
        >
          SIMILAR ITEMS
        </Heading>

        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {simData.map((item: IProduct) => (
            <Flex
              direction={'row'}
              key={item.id}
              p={'8px'}
              overflow="hidden"
              bg={'primary.500'}
              h={24}
              gap={5}
              alignItems={'center'}
              onClick={() => handleProductClick(item)}
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
          {isLoading && (
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              h={24}
              // bg={'primary.500'}
            >
              <Spinner color={'black'} />
            </Flex>
          )}
        </Grid>
      </Box>
      <Toaster />
    </Flex>
  );
};

export default Product;
