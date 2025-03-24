import { Icon, IconProps } from '@chakra-ui/react';

const SvgComponent: React.FC<IconProps> = (props) => {
  return (
    <Icon size="lg">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="7" width="18" height="2" fill="#242533" />
        <rect x="3" y="15" width="10" height="2" fill="#242533" />
      </svg>
    </Icon>
  );
};

export default SvgComponent;
