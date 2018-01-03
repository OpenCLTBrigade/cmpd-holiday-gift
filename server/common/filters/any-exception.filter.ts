import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch(Error)
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
      
    if (exception.name === 'UnauthorizedError') {
        return response.status(401).send('invalid token...');
    }

    response
      .status(500)
      .json({
        statusCode: 500,
        message: `It's a message from the exception filter`,
      });
  }
}