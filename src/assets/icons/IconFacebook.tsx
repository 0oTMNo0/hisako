import { Icon, IconProps } from '@chakra-ui/react';

const SvgComponent: React.FC<IconProps> = (props) => {
  return (
    <Icon size="lg" color="red.500">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.9143 16C15.4613 16 15.8485 15.5792 15.8485 15.0405C15.8485 14.788 15.7643 14.5439 15.5792 14.3672L11.6149 10.3945C12.4482 9.30037 12.9448 7.94529 12.9448 6.47238C12.9448 2.91215 10.0326 0 6.47238 0C2.92057 0 0 2.90373 0 6.47238C0 10.0326 2.91215 12.9448 6.47238 12.9448C7.87796 12.9448 9.17412 12.4903 10.2346 11.7328L14.2241 15.7223C14.4093 15.9074 14.6533 16 14.9143 16ZM6.47238 11.5476C3.6949 11.5476 1.39716 9.24987 1.39716 6.47238C1.39716 3.6949 3.6949 1.39716 6.47238 1.39716C9.24987 1.39716 11.5476 3.6949 11.5476 6.47238C11.5476 9.24987 9.24987 11.5476 6.47238 11.5476Z"
          fill="black"
        />
      </svg>
    </Icon>
  );
};

export default SvgComponent;
