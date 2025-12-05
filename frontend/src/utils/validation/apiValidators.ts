export const isApiError = (response: any): response is { 
  message: string; 
  errors?: Record<string, string[]> 
} => {
  return response && response.message && response.errors !== undefined;
};

export const getValidationErrors = (error: any): Record<string, string> => {
  if (error?.response?.data?.errors) {
    const errors: Record<string, string> = {};
    Object.entries(error.response.data.errors).forEach(([field, messages]) => {
      errors[field] = (messages as string[])[0];
    });
    return errors;
  }
  return {};
};