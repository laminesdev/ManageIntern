export const isPastDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   const now = new Date();
   return date < now;
};

export const isFutureDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   const now = new Date();
   return date > now;
};

export const isValidDate = (dateString: string): boolean => {
   const date = new Date(dateString);
   return date instanceof Date && !isNaN(date.getTime());
};
