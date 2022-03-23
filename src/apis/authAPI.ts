const MOCK_USER = {
  username: 'fcs123',
  password: 'fcsuser',
};

function sleep(ms: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const login = async (username: string, password: string) => {
  /**
   * Fake Authentication API
   */
  await sleep(500);
  if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
    return Promise.reject({message: 'Invalid username or password.'});
  } else {
    return Promise.resolve();
  }
};

export const authAPI = {
  login,
};
