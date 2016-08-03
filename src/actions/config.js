import fetch from 'hahoorequest/lib/whatwg-fetch';
import config from '../config';

export const request = fetch;
export const apiUrl = `http://${config.apiHost}:${config.apiPort}`;
