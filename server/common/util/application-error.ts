import logger from './logger'

export class ApplicationError extends Error {
    constructor(message?: string, public code?: string) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}

export const handleErrors = (errorMap) =>(error: Error) => {
    logger.error(error);
    
    if(error instanceof ApplicationError) {
        const { code = "default" } = error;
        const ErrorToThrow = errorMap[code];

        throw new ErrorToThrow();
    }

    throw error;
}