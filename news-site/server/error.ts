/*UTILITY FUNCTONS FOR HANDLING UNKNOWN ERROR TYPE WITHIN 
TRY/CATCH BLOCK FROM THIS WEB ADDRESS: 
https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
*/


export type ErrorWithMessage = {
    message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      //turns error into string that keys into unknown
      typeof (error as Record<string, unknown>).message === 'string'
    )
  }
  
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
    //If the error has a string message. Return the error
    if (isErrorWithMessage(maybeError)) return maybeError
  
    //Else attempt to construct an error with the string output
    try {
      return new Error(JSON.stringify(maybeError))
    } catch {
      // fallback in case there's an error stringifying the maybeError
      // like with circular references for example.
      return new Error(String(maybeError))
    }
  }
  
export const getErrorMessage = (error: unknown) => {
    return toErrorWithMessage(error).message
}