import authorConfig from '../mla-api-config/author.config.js';

export const getAuthor = () => {
  return {
    name: authorConfig.name,
    lastname: authorConfig.lastname
  }
};