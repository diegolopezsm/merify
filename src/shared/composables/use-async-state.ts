import { useAsyncState } from "@vueuse/core";

export { useAsyncState };

// import { ref, type Ref } from 'vue';
// import { safeRequest } from '@/shared/utils/safe-request';

// export interface UseAsyncStateOptions<T> {
//   immediate?: boolean;
//   initialData?: T;
// }

// export interface UseAsyncStateReturn<T> {
//   data: Ref<T | undefined>;
//   loading: Ref<boolean>;
//   error: Ref<Error | null>;
//   execute: (...args: any[]) => Promise<T | undefined>;
//   reset: () => void;
// }

// /**
//  * A composable for handling async operations with loading, data, and error states
//  * @param asyncFn - The async function to execute
//  * @param options - Configuration options
//  * @returns Object containing reactive state and control methods
//  */
// export function useAsyncState<T>(
//   asyncFn: (...args: any[]) => Promise<T>,
//   options: UseAsyncStateOptions<T> = {}
// ): UseAsyncStateReturn<T> {
//   const { immediate = true, initialData } = options;

//   const data = ref(initialData) as Ref<T | undefined>;
//   const loading = ref(false);
//   const error = ref<Error | null>(null);

//   const execute = async (...args: any[]): Promise<T | undefined> => {
//     loading.value = true;
//     error.value = null;

//     const [result, errorResult] = await safeRequest(async () => {
//       return await asyncFn(...args);
//     });

//     if (errorResult) {
//       error.value = errorResult;
//       loading.value = false;
//       return undefined;
//     }

//     data.value = result;
//     loading.value = false;
//     return result;
//   };

//   const reset = () => {
//     data.value = initialData;
//     loading.value = false;
//     error.value = null;
//   };

//   // Execute immediately if requested
//   if (immediate) {
//     execute();
//   }

//   return {
//     data,
//     loading,
//     error,
//     execute,
//     reset,
//   };
// }
