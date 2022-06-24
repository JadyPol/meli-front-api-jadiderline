import axios from 'axios';

import { getItemFormat } from '../mla-utils/item-format.mapper.js';
import { getAuthor } from '../mla-utils/author.mapper.js';
import mlaConfig from '../mla-api-config/mla-api.config.js';

/**
 * getSearch:  RESTful GET request returning JSON object(s)
 * @param args: url query params
 * @param onResult: callback to pass the results JSON object(s) back
 */
export const getSearch = async (args, onResult) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${mlaConfig.search_by}?${args}`
    });
    onResult({ ...getResponseFormat(response.data) }, null)
  } catch (error) {
    onResult(null, error)
  }
};

function getResponseFormat(response) {
  return {
    author: getAuthor(),
    categories: getCategories(response.filters),
    items: getResults(response.results),
  }
}

function getResults(results) {
  // Get random 4 elements
  return results
    .sort(() => Math.random() - Math.random())
    .slice(0, 4)
    .map(item => getItemFormat(item, 0));
}

function getCategories(filters) {
  // Get search categories
  return [].concat(...(filters?.find(filter => filter.id === 'category')?.values || [])
    .map(root => (root.path_from_root || [])
      .map(path => ({
        name: path.name,
        id: path.id
      }))));
}

