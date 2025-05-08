import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';
import { Box, Field, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface FormValues {
  Email: string;
  Password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const {
    postLogin,
    setAssessTokenToLocalStorage,
    setRefreshTokenToLocalStorage,
  } = React.useContext(RestfulApiContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await postLogin(
        {},
        {},
        {
          email: data.Email,
          password: data.Password,
        }
      );
      console.log('Login response:', response);
      const { access, refresh } = response.data;
      setAssessTokenToLocalStorage(access);
      setRefreshTokenToLocalStorage(refresh);
      navigate('/success', {
        state: { msg: `Welcome back, ${data.Email}!` },
      });
    } catch (error: any) {
      console.error('Error during login:', error);
      // Optionally, you could show an error message to the user here
    }
  });

  return (
    <Flex direction={'column'} h={'100vh'} background={'background.1'}>
      {/* header */}
      <Flex
        w="100%"
        // h={'92px'}
        py={5}
        alignItems={'center'}
        justifyContent={'center'}
        background={'background.1'}
      >
        <Ititle fontSize="xl" color={'black'}>
          HISAKO
        </Ititle>
      </Flex>
      <Flex
        // alignItems={'center'}
        justifyContent={'center'}
        background={'primary.500'}
        h={'3/5'}
      >
        <Flex
          direction={'column'}
          maxWidth={'breakpoint-sm'}
          px={50}
          w={'full'}
          alignItems={'center'}
        >
          <Text fontSize="xl" color={'black'} my={35}>
            Login
          </Text>

          <Box w="full">
            <form onSubmit={onSubmit}>
              <Field.Root invalid={!!errors.Email}>
                <IInput
                  placeholder="Email"
                  size="lg"
                  mb={30}
                  error={!!errors.Email}
                  // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  //   console.log(e.currentTarget.value)
                  // }
                  {...register('Email')}
                />
                <Field.ErrorText>{errors.Email?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.Password}>
                <IInput
                  placeholder="Password"
                  size="lg"
                  mb={15}
                  error={!!errors.Password}
                  {...register('Password')}
                />
                <Field.ErrorText>{errors.Password?.message}</Field.ErrorText>
              </Field.Root>

              <Text
                onClick={() => navigate('/login/ResetPassword')}
                fontSize={'2xs'}
                color={'black'}
                w={'full'}
                textAlign={'center'}
                mb={35}
                cursor={'pointer'}
              >
                FORGOTTEN PASSWORD?
              </Text>
              <Ibutton
                w={'full'}
                size="xl"
                bgColor={'secondary.500'}
                color={'white'}
                mb={15}
                type="submit"
                // onClick={() => {
                //   postLogin({}, {}, { username: 'admin', password: 'admin' })
                //     .then((res: any) => console.log(res))
                //     .catch((error: any) => {
                //       console.error('Error during login:', error);
                //     });
                //   // navigate('/success', { state: { msg: 'Your message here' } })
                // }}
              >
                SIGN IN
              </Ibutton>
            </form>
          </Box>
          <Text
            fontSize={'2xs'}
            color={'white'}
            cursor={'pointer'}
            mb={35}
            onClick={() => navigate('/createAccount')}
          >
            CREATE NEW ACCOUNT
          </Text>
        </Flex>
      </Flex>
      <Flex w="full" h="full" justifyContent="center" alignItems="center">
        <Text
          onClick={() => navigate('/login/ResetPassword')}
          fontSize={'xs'}
          color={'black'}
          mb={35}
        >
          OR CONTINUE WITH
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
