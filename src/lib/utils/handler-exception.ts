import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';

export const handleError = (error: any, defaultMessage: string = "An unexpected error occurred") => {
  if(error instanceof AxiosError){
    return NextResponse.json({error:error.response!.data || defaultMessage},{status:error.response!.status})
  }
  return NextResponse.json({ error: error.message || defaultMessage }, { status: 500 });
};

export const handleNotFound = (message: string = "Resource not found") => {
  return NextResponse.json({ error: message }, { status: 404 });
};

export const handleBadRequest = (message: string = "Bad request") => {
  return NextResponse.json({ error: message }, { status: 400 });
};

export const handleSuccess = (data: any, status: number = 200) => {
  return NextResponse.json(data, { status });
};
