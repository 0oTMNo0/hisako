import React from 'react';
import { Box, Flex, Image, Text, Heading, Grid } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [data, setData] = React.useState(20);

  const handleProductClick = () => {
    const productId = 123;
    const productName = 'Sample Product';
    // It's a good idea to encode the product name if it contains spaces or special characters
    navigate(`/product/${productId}/${encodeURIComponent(productName)}`);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('loading', data);
            // Call your API here when ready
            setData((d) => {
              return d < 40 ? d + 5 : d;
            });
          }
        });
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <Box bg={'background.1'} maxWidth={'100vw'} minHeight={'100vh'} pt={10}>
      <Box width="100vw">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          style={{ paddingLeft: 30, paddingRight: 30 }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((item: any) => (
            <SwiperSlide
              key={item}
              style={{ width: '280px', height: '320px', position: 'relative' }}
            >
              <Image
                src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                alt={`Product ${item}`}
                width="full"
                height="full"
                objectFit="cover"
                draggable={false}
              />
              <Text
                draggable={false}
                position="absolute"
                bottom="1rem"
                left="1rem"
                color="white"
                fontSize="lg"
                fontWeight="bold"
              >
                2PRODUCT {item}
              </Text>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box px={30}>
        <Heading
          mb={6}
          mt={50}
          fontSize={{ base: 'lg', md: '2xl' }}
          color={'black'}
        >
          DISCOVER
        </Heading>

        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
        >
          {Array.from({ length: data }).map((_, index) => (
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
        {/* Sentinel element to trigger loading when scrolled into view */}
        <Box ref={loadMoreRef} height="1px" />
      </Box>
    </Box>
  );
}
