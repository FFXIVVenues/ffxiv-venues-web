export const isDataCenter = (dataCenter) =>
  (venue) =>
    venue.location.dataCenter === dataCenter;