export interface DB {
  getInstance(): DB;
  initializeDb(): void;
  get(query: string, params: Array<any>): Promise<any>;
  run(query: string, params: Array<any>): Promise<number>;
  each(
    query: string,
    params: Array<any>,
    callback?: (arg1: any, arg2: any) => void
  ): Promise<any>;
  all(query: string, params: Array<any>): Promise<unknown>;
}