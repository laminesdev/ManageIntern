export const handleApiError = (error: any): string => {
   if (error.response) {
      // Server responded with error
      switch (error.response.status) {
         case 401:
            return "Unauthorized. Please login again.";
         case 403:
            return "You do not have permission to perform this action.";
         case 404:
            return "Resource not found.";
         case 422:
            return "Validation error. Please check your input.";
         case 500:
            return "Server error. Please try again later.";
         default:
            return error.response.data?.message || "An error occurred.";
      }
   } else if (error.request) {
      // Request made but no response
      return "Network error. Please check your connection.";
   } else {
      // Error setting up request
      return "Request error. Please try again.";
   }
};
