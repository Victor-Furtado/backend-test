export default interface ApiResponse {
  statusCode: number;
  message: Array<string>;
  error: string | null;
  data: any;
}
