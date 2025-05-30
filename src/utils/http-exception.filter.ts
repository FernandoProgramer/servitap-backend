import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import {  Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private handleException(response: Response, statusCode: number, message: string) {
        return response.status(statusCode).json({
            successful: false,
            message,
            statusCode,
        })
    }

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof HttpException) {
            const exceptionResponse: any = exception.getResponse();

            const message: string = exceptionResponse.message;

            return this.handleException(response, exception.getStatus(), message)
        }

        // Debug mode
        if (process.env.NODE_ENV !== 'production') {
            console.error('Exception Debugging =>> ', exception);
        }

        return this.handleException(response, 500, "Internal server error");
    }

}