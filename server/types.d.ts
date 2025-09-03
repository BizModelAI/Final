// Type declarations for server
declare module 'express' {
  interface Request {
    session?: any;
    sessionID?: string;
    ip?: string;
    connection?: any;
    protocol?: string;
    body?: any;
    params?: any;
    query?: any;
    headers?: any;
    method?: string;
    originalUrl?: string;
    path?: string;
    get?(name: string): string | undefined;
  }
  
  interface Response {
    status(code: number): Response;
    json(obj?: any): Response;
    send(data: any): Response;
    sendStatus(code: number): Response;
    setHeader(name: string, value: string | number): Response;
    header(name: string, value: string): Response;
    getHeaders(): any;
    headersSent?: boolean;
    clearCookie(name: string): Response;
    sendFile(path: string): void;
  }
}

export interface AdminAuthRequest {
  adminUser?: any;
  session?: any;
  sessionID?: string;
  ip?: string;
  connection?: any;
  protocol?: string;
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  get?(name: string): string | undefined;
}
