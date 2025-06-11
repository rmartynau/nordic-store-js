export const fileReader = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.addEventListener("error", () => {
      reject(reader.error);
    });
  });
};
