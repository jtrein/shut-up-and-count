export const ALLOWED_MIME = 'text/plain';
export const API_HOST = process.env.API_HOST || 'http://localhost';
export const API_PORT = process.env.API_PORT || 4000;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MSG_SERVER_ERR = 'Sorry, it appears our server is gone.';
export const PARSE_ENDPOINT = `${API_HOST}:${API_PORT}/parse`;
export const UPLOAD_KEY = 'textFile';
