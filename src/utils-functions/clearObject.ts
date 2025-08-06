export const clearObject = (obj: any) => {
  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      obj[key] = [];
    } else if (typeof value === 'object' && value !== null) {
      clearObject(value);
    } else if (typeof value === 'number') {
      obj[key] = 0;
    } else {
      obj[key] = '';
    }
  }
};