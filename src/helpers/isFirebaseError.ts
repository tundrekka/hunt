interface IFirebaseError extends Error {
   code: string;
   message: string;
}

/** Check if we have a firebase error. */
export function isFirebaseError(err: any): err is IFirebaseError {
   return err.code && err.code.startsWith('auth/');
}