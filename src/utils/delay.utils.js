// delay func to simulate blocking request
export function delay(duration) {
  const startTime = Date.now();

  //   simulating blocking section
  while (Date.now() - startTime < duration) {}
}
