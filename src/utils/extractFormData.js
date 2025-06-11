export const extractFormData = (form) => {
  const data = new FormData(form);
  const result = {};

  data.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};
