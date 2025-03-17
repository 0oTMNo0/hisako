import { createSystem, defaultConfig } from '@chakra-ui/react';

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: {
          500: { value: '#A18582' },
        },
        secondary: {
          500: { value: '#242533' },
        },
        background: {
          1: { value: '#FFFFFF' },
          2: { value: '#CCCCCC' },
        },
      },
    },
    // semanticTokens: {
    //   colors: {
    //     brand: {
    //       solid: { value: '{colors.brand.500}' },
    //       contrast: { value: '{colors.brand.100}' },
    //       fg: { value: '{colors.brand.700}' },
    //       muted: { value: '{colors.brand.100}' },
    //       subtle: { value: '{colors.brand.200}' },
    //       emphasized: { value: '{colors.brand.300}' },
    //       focusRing: { value: '{colors.brand.500}' },
    //     },
    //   },
    // },
  },
});
