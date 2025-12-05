import type { PaginatedResponse } from "@/types";

export const parsePaginatedResponse = <T>(response: PaginatedResponse<T>) => {
   return {
      data: response.data,
      pagination: {
         currentPage: response.meta.current_page,
         totalPages: response.meta.last_page,
         totalItems: response.meta.total,
         perPage: response.meta.per_page,
         hasNextPage: !!response.links.next,
         hasPrevPage: !!response.links.prev,
      },
   };
};

export const extractErrorMessage = (error: any): string => {
   if (error?.response?.data?.message) {
      return error.response.data.message;
   }
   if (error?.message) {
      return error.message;
   }
   return "An unknown error occurred";
};
