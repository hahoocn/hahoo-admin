import isNumeric from 'validator/lib/isNumeric';

export function filterPage(page) {
  let result = 1;
  if (!page) {
    return 1;
  }

  if (!isNumeric(`${page}`)) {
    return -1;
  }

  try {
    result = parseInt(page, 10);
    if (result <= 0) {
      return -1;
    }
  } catch (e) {
    return -1;
  }

  return result;
}
