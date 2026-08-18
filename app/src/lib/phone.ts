export const parsePhoneNumber = (phone: string) => {
  return phone.replace(/[^0-9]/g, '');
};
