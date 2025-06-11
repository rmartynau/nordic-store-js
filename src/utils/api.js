export const mapResponseApiData = (data) => {
  if (!data) return [];

  return Object.entries(data).map(([key, value]) => ({
    id: key,
    ...value,
  }));
};
