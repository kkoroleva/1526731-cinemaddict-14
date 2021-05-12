export const getShowMoreButton = (dataLength) => {
  return dataLength > 0 ? '<button class="films-list__show-more">Show more</button>': '';
};
