import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export const handleError = (error: any, defaultMessage: string = "An unexpected error occurred") => {
  if (axios.isAxiosError(error)) {
    return NextResponse.json<ErrorResponse>({
      message: error.response && error.response.data ? error.response.data.message : error.message,
      status: error.response && error.response.data ? error.response.data.status : error.response?.status,
    }, {
      status: error.response ? error.response.status : 500,
    });
  }
  return NextResponse.json<ErrorResponse>({ message: error.message || defaultMessage, status: 500 }, { status: 500 });
};

export const handleNotFound = (message: string = "Resource not found") => {
  return NextResponse.json({ error: message }, { status: 404 });
};

export const handleBadRequest = (message: string = "Bad request") => {
  return NextResponse.json<ErrorResponse>({ message, status: 400 }, { status: 400 });
};

