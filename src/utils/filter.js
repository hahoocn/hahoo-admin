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

export function filterId(id) {
  let result = 0;
  if (!id || !isNumeric(`${id}`)) {
    return -1;
  }

  try {
    result = parseInt(id, 10);
    if (result <= 0) {
      return -1;
    }
  } catch (e) {
    return -1;
  }

  return result;
}

export function filterParentId(id) {
  let result = 0;
  if (id) {
    if (!isNumeric(`${id}`)) {
      return -1;
    }
    try {
      result = parseInt(id, 10);
      if (result < 0) {
        return -1;
      }
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  return result;
}
