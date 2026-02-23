const tokenConfig = {
  refreshToken: {
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  },
  accessToken: {
    maxAge: 14.5 * 60, // 14.5 minutes in seconds
  },
  deviceId: {
    maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
  },
};

export default tokenConfig;
