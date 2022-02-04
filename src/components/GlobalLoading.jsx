import { Flex } from '@chakra-ui/react';
import React from 'react';

import Logo from '../components/Logo';

const GlobalLoading = () => {
  return (
    <Flex minH={'100vh'} flex={1} justify="center" align="center">
      <Logo h={'40vmin'} />
    </Flex>
  );
};

export default GlobalLoading;
