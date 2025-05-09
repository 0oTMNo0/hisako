import React from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Grid,
  Spinner,
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { IProduct } from '@/constants/Global';
import { set } from 'react-hook-form';
import { it } from 'node:test';

export default function Home() {
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [data, setData] = React.useState<IProduct[]>([]);
  const [swaperData, setSwiperData] = React.useState<IProduct[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [apiCall, setApiCall] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [noMoreData, setNoMoreData] = React.useState(false);

  const { getProducts, handleTokenExist } = React.useContext(RestfulApiContext);

  const handleProductClick = async (product: IProduct) => {
    navigate(`/product/${product.id}/${product.prod_title}`, {
      state: { product },
    });
  };

  const pageRef = React.useRef(pageNumber);
  React.useEffect(() => {
    pageRef.current = pageNumber;
  }, [pageNumber]);

  const callData = () => {
    const nextPage = pageRef.current;
    setIsLoading(true);
    // console.log('Fetching page', nextPage);
    getProducts(
      {
        page: nextPage,
      },
      {},
      {}
    )
      .then((res: any) => {
        // console.log('Response:', res);
        setData((d) => [...d, ...res.data.results]);
        setPageNumber((p) => p + 1);
        if (res.data.count <= nextPage * 10) {
          setNoMoreData(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const callDataForSwaper = () => {
    getProducts(
      {
        page: 1,
        colour: 'red',
        sort: 'created',
        subcategory: 'Dress',
        usage: 'Party',
      },
      {}
    ).then((res: any) => {
      setSwiperData(res.data.results);
    });
  };

  React.useEffect(() => {
    if (apiCall == 1) {
      callDataForSwaper();
    }
  }, [apiCall]);

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
    if (apiCall > 0 && !isLoading && !noMoreData) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoading && !noMoreData) {
              callData();
            }
          });
        },
        { threshold: 0 }
      );

      observer.observe(loadMoreRef.current!);
      return () => observer.disconnect();
    }
  }, [apiCall]);

  return (
    <Box bg={'background.1'} maxWidth={'100vw'} minHeight={'100vh'} pt={10}>
      <Box width="100vw">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          freeMode={true}
          style={{ paddingLeft: 30, paddingRight: 30 }}
        >
          {swaperData.map((item: IProduct, index: number) => (
            <SwiperSlide
              key={item.id}
              onClick={() => handleProductClick(item)}
              style={{ width: '280px', height: '320px', position: 'relative' }}
            >
              <Image
                src={item.image}
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
                color="black"
                fontSize="lg"
                fontWeight="bold"
              >
                {/* just show two first words */}
                {item.prod_title.split(' ').slice(0, 2).join(' ')}
                {/* {item.prod_title} */}
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
          {data.map((item: IProduct, index: number) => (
            <Flex
              direction={'row'}
              key={index}
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
        </Grid>
        {isLoading && (
          <Flex
            justifyContent="center"
            alignItems="center"
            height="50px"
            width="100%"
          >
            <Spinner color={'black'} />
          </Flex>
        )}
        {noMoreData && (
          <Text fontSize="sm" color="gray.500" textAlign="center" mt={4} mb={8}>
            No more products to load.
          </Text>
        )}
        {/* Sentinel element to trigger loading when scrolled into view */}
        <Box ref={loadMoreRef} height="1px" />
      </Box>
    </Box>
  );
}
