import { IconLove, IconMenu } from '@/assets/icons';
import Ibutton from '@/components/ui/Ibutton';
import Ititle from '@/components/ui/Ititle';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const Product = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();

  const handleProductClick = () => {
    const productId = 123;
    const productName = 'Sample Product';
    // It's a good idea to encode the product name if it contains spaces or special characters
    navigate(`/product/${productId}/${encodeURIComponent(productName)}`);
  };

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
            src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
            alt={`Product ${1}`}
            width="full"
            height="full"
            w={{ base: 'full', md: 500 }}
            h={{ base: 'auto', md: 550 }}
            objectFit="cover"
            draggable={false}
          />
        </GridItem>
        <GridItem colSpan={1} p={{ base: 0, md: 30 }}>
          {/* <h1>Product: {name}</h1>
        <p>ID: {id}</p> */}
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
              Description Named after asteroid 6 0 9 4 (h i s a k o) is
              currently travelling through time and space. STOCK SIZE, COLOUR
              BRAND XXX is a designer brand that makes their garments in space.
            </Text>
            <Flex gap={{ base: 10, sm: 5 }}>
              <Ibutton bg={'primary.500'} flex={1}>
                BUY NOW
              </Ibutton>
              <IconButton
                // aria-label="Search database"
                variant="outline"
                size={'md'}
                rounded={0}
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
          {Array.from({ length: 8 }).map((_, index) => (
            <Flex
              direction={'row'}
              key={index}
              p={'8px'}
              overflow="hidden"
              bg={'primary.500'}
              h={24}
              gap={5}
              alignItems={'center'}
              onClick={handleProductClick}
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
                  PRODUCT {index}
                </Text>
                <Text fontSize="xs" color="black">
                  Size, colour
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Product;
