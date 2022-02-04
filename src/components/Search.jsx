import React from 'react';
import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { debounce } from '../utils/helpers';
import { searchResultsAsyncThunk } from '../state/github/async/searchResultsAsyncThunk';

const Search = () => {
  const dispatch = useDispatch();

  const handleSearch = async e => {
    const query = e.target.value.trim();

    dispatch(searchResultsAsyncThunk({query}))
  };

  return (
    <InputGroup maxW={['80%', '60vmin']}>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={FaSearch} color="gray.300" />}
      />
      <Input
        type="text"
        placeholder="Type username... (ex. p19ky)"
        focusBorderColor="teal.400"
        onChange={debounce(handleSearch, 300)}
      />
    </InputGroup>
  );
};

export default Search;
