interface BasicResponse {
  httpCode: number;
  message?: string;
}

interface ResponseWithData<T> extends BasicResponse {
  data: T;
}

interface AuthStatus {
  authenticated: boolean;
}

export type { BasicResponse, ResponseWithData, AuthStatus };
