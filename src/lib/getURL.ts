import config from '../config';

/**
 * Get the URL for the api endpoint.
 * The location is based on the value in src/config.ts
 * @param path The path. Each section comma seperated.
 * @returns The URL as a string
 * @example getURL('register') => 'http://localhost:3000/register'
 * @example getURL('app', 'session') => 'http://localhost:3000/app/session'
 * @example getURL() => 'http://localhost:3000'
 * 
 */
export default function getURL(...path: string[]): string {
  return `${[config.api.url, ...path].join('/')}`;
}