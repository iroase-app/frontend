interface Config {
  api: {
    /**
      * The location of the API server.
      * No trailing slash!
      * @default 'http://localhost:3000'
      * @example 'https://example.com'
    */
    url: string,
  }
}

const config: Config = {
  api: {
    url:
      'http://localhost:3000'
  }
}

export default config;