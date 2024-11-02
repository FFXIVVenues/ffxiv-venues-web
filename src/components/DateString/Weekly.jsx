export const Weekly = (d) => {
  switch (d) {
    case 1:
      return "Weekly";
    case 2:
      return "Biweekly";
    case 3:
      return "Triweekly";
    default:
      return `${d} weekly`;
  }
};
