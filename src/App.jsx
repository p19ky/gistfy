import React from 'react';
import {
  VStack,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Flex,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import { Logo } from './components/Logo';
import { FaSearch } from 'react-icons/fa';

const App = () => {
  return (
    
      <Flex flex={1} direction="column" minH="100vh" p={2}>
        <ColorModeSwitcher alignSelf="flex-end" />
        <VStack spacing={8} flex={1}>
          <Logo h="20vmin" pointerEvents="none" />
          <InputGroup maxW={["80%", "60vmin"]}>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={FaSearch} color="gray.300" />}
            />
            <Input type="text" placeholder="p19ky..." focusBorderColor='teal.400' />
          </InputGroup>
        </VStack>
      </Flex>
  );
}

export default App;
