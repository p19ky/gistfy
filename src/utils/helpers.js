import { Octokit } from '@octokit/core';

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const octokit = new Octokit({ auth: process.env.REACT_APP_OCTOKIT_ACCESS_TOKEN_FROM_GITHUB });
