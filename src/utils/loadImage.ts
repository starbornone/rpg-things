/**
 * Loads an image from the given source URL and returns an object containing the
 * image element and a flag indicating that the image is loaded.
 * @param src - The source URL of the image to load.
 * @returns An object containing the `Image` element and a `loaded` flag set to `true`.
 */
export const loadImage = (src: string) => {
  const image = new Image();
  image.src = src;
  return {
    image,
    loaded: true,
  };
};
