export const formatUrl = (url) => {
  return url.split("-").join(" ");
};

export const formatTitle = (url) => {
  return url.split("-")[0];
};

export const isAvailablePresence = (index, hoursOfSubject) => {
  return (
    Date.parse(new Date()) >
    (index - 1) * 604800000 + Date.parse(hoursOfSubject)
  );
};
