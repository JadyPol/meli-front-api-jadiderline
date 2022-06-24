export const getItemFormat = (item, decimals) => {
  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: decimals
    },
    picture: item.thumbnail,
    condition: getCondition(item.attributes),
    free_shipping: !!item.shipping.free_shipping,
    address: item.address?.state_name
  }
};

function getCondition(attributes) {
  return attributes?.find(attr => attr.id === 'ITEM_CONDITION')?.value_name;
}