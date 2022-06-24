// Mercadolibre's public API config

const baseAPI = 'https://api.mercadolibre.com';

const mlaConfig = {
  search_by: `${baseAPI}/sites/MLA/search`,
  get_item_detail: `${baseAPI}/items/{item_id}`,
  get_item_description: `${baseAPI}/items/{item_id}/description`
};

export default mlaConfig;