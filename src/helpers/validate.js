const shortHeader = (data) => {
  try {
    if (data === null || data === undefined) return null;
    const length = 10;
    const trimmedData = `${data.substring(0, length)} ...`;
    return trimmedData;
  } catch (error) {
    return error.toString();
  }
};

const shortBody = (data) => {
  try {
    if (data === null || data === undefined) return null;
    const length = 50;
    const trimmedData = `${data.substring(0, length)} ...`;
    return trimmedData;
  } catch (error) {
    return error.toString();
  }
};

export { shortHeader, shortBody };
