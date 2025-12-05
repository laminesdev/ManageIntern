export const validateEmail = (email: string): boolean => {
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email);
};

export const validatePassword = (password: string): boolean => {
   return password.length >= 8;
};

export const validateRequired = (value: string): boolean => {
   return value.trim().length > 0;
};

export const validateDeadline = (deadline: string): boolean => {
   const date = new Date(deadline);
   const today = new Date();
   today.setHours(0, 0, 0, 0);
   return date >= today;
};
