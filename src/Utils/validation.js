export const emailIsValid = (email) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
export const phoneIsValid = (phone) =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone);

export const zipIsValid = (zip) => /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);

export const idIsValid = (id, data) => !data.some((e) => e.id == id);

export const latIsValid = (lat) =>
  /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/.test(lat);

export const lngIsValid = (lng) =>
  /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/.test(lng);
