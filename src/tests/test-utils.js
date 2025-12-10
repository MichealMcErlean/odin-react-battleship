export const isArrayOfArrays = (arr) => {
      return Array.isArray(arr) && arr.every(Array.isArray);
    };