export const loadImage = (src: string) => {
  const image = new Image();
  image.src = src;
  return {
    element: image,
    src,
    loaded: true,
  };
};
