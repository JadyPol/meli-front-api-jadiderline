import axios from 'axios';
import urlTemplate from 'url-template';

import { getItemFormat } from '../mla-utils/item-format.mapper.js';
import { getAuthor } from '../mla-utils/author.mapper.js';
import mlaConfig from '../mla-api-config/mla-api.config.js';

/**
 * getItemDetail:  RESTful GET request returning JSON object(s)
 * @param id: product id
 * @param onResult: callback to pass the results JSON object(s) back
 */
export const getItemDetail = async (id, onResult) => {
  try {
    const detail = await axios({
      method: 'GET',
      url: urlTemplate.parse(mlaConfig.get_item_detail).expand({ item_id: id })
    });
    const description = await axios({
      method: 'GET',
      url: urlTemplate.parse(mlaConfig.get_item_description).expand({ item_id: id })
    });
    onResult({ ...getResponseFormat(detail.data, description.data) }, null)
  } catch (error) {
    onResult(null, error)
  }
};

function getResponseFormat(detail, description) {
  return {
    author: getAuthor(),
    item: getDetailItem(detail, description)
  }
}

function getDetailItem(detail, description) {
  const item = getItemFormat(detail, 2);
  return {
    ...item,
    picture: detail.pictures[0]?.secure_url,
    sold_quantity: detail.sold_quantity,
    description: description?.plain_text,
    permalink: detail.permalink
  }
}
