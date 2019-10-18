export const config = {
  app: {
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  cache: {
    ttl: process.env.CACHE_TTL,
    max: process.env.CACHE_MAX,
  },
};

export default config;
