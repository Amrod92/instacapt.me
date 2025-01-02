function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // Ensure min and max are valid to avoid unexpected behavior
  if (isNaN(min) || isNaN(max) || min > max) {
    throw new Error(
      'Invalid arguments: min should be less than or equal to max and both should be numbers'
    );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomNumber;
