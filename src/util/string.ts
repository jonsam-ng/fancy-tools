/** @desc 首字母大写 */
const toFirstLetterUpperCase = (word: string) => {
  return word.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
};

const getExtFromMime = (mime: string) => {
  const innerMime = mime.split(";")?.[0];
  return innerMime?.split("/")[1];
};

export { toFirstLetterUpperCase, getExtFromMime };
