export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hours ${mins} minutes`;
};
