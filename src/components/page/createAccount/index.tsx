import Ibutton from '@/components/ui/Ibutton';
import IInput from '@/components/ui/Iinput';
import Ititle from '@/components/ui/Ititle';
import { Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RestfulApiContext } from '@/hooks/ResfulApiContext';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const CreateAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const { postRegister } = useContext(RestfulApiContext);

  const onSubmit = async (data: FormValues) => {
    console.log('1111', data);
    const { email, password } = data;
    try {
      await postRegister({}, {}, { email, password });
      navigate('/success', { state: { message: `Welcome ${email}` } });
    } catch (error) {
      // handle error if needed
    }
  };

  return (
    <Flex direction={'column'} h={'100vh'} background={'background.1'}>
      {/* header */}
      <Flex
        w="100%"
        h={92}
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
            CREATE ACCOUNT
          </Text>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <IInput
              placeholder="email"
              size="lg"
              error={!!errors.email}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <Text color="red" fontSize="sm">
                {errors.email.message}
              </Text>
            )}
            <IInput
              placeholder="password"
              size="lg"
              mt={30}
              type="password"
              error={!!errors.password}
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <Text color="red" fontSize="sm">
                {errors.password.message}
              </Text>
            )}
            <Text fontSize={'2xs'} color={'black'} mb={15} mt={15}>
              CONFIRM PASSWORD
            </Text>
            <IInput
              placeholder="password"
              size="lg"
              type="password"
              error={!!errors.confirmPassword}
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <Text color="red" fontSize="sm">
                {errors.confirmPassword.message}
              </Text>
            )}
            <Ibutton
              w={'full'}
              size="xl"
              bgColor={'secondary.500'}
              color={'white'}
              mt={35}
              mb={15}
              type="submit"
            >
              CREATE ACCOUNT
            </Ibutton>
          </form>
          <Text
            fontSize={'2xs'}
            color={'white'}
            cursor={'pointer'}
            mb={35}
            onClick={() => navigate('/login')}
          >
            I already have account
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateAccount;
