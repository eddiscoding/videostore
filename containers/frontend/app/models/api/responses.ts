export type BasicResponse = {
  status: boolean;
  message: string;
};

export type ResponseWithData<T> = BasicResponse & {
  data: T
};
