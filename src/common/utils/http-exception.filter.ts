import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";
import { buildResponse } from "./build-response";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private buildErrorResponse(response: Response, statusCode: number, message: string) {
        const payload = buildResponse({
            successful: false,
            message,
        });

        return response.status(statusCode).json(payload);

    }

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof HttpException) {
            const exceptionResponse: any = exception.getResponse();
            const message: string = Array.isArray(exceptionResponse.message) ? exceptionResponse.message.join(', ') : exceptionResponse.message;
            return this.buildErrorResponse(response, exception.getStatus(), message)
        }

        // Debug mode
        if (process.env.NODE_ENV !== 'production') {
            console.error('Exception Debugging =>> ', exception);
        }

        return this.buildErrorResponse(response, 500, "Internal server error");
    }

}