export const randomId = (size = 8) => {
  const str = 'plokmijnuhbygvtfcrdxeszwaq1234567890';
  let result = '';
  while (result.length < size) {
    result += str.charAt(Math.floor(str.length * Math.random()));
  }
  return result;
};
