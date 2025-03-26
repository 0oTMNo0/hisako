import { Icon, IconProps } from '@chakra-ui/react';

const SvgComponent: React.FC<IconProps> = (props) => {
  return (
    <Icon size="lg" color="red.500">
      <svg
        width="27"
        height="27"
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.2436 5.33253C22.1261 4.18922 20.6102 3.54687 19.0295 3.54688C17.4487 3.54688 15.9328 4.18922 14.8153 5.33253L13.667 6.50684L12.5186 5.33253C10.1912 2.95245 6.41771 2.95245 4.09029 5.33253C1.76287 7.7126 1.76287 11.5715 4.09029 13.9515L5.23862 15.1259L13.667 23.7449L22.0953 15.1259L23.2436 13.9515C24.3616 12.8088 24.9898 11.2585 24.9898 9.64204C24.9898 8.02554 24.3616 6.47529 23.2436 5.33253Z"
          stroke="#020102"
          stroke-linejoin="round"
        />
      </svg>
    </Icon>
  );
};

export default SvgComponent;
