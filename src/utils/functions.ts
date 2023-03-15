export const CONVER_TO_HOURS_AND_MINUTES = (duration: number): string => {
  return `${(duration / 60).toString().split('.')[0]}h ${duration % 60}m`;
};
