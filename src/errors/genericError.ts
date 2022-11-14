class GenericError extends Error {
  constructor (message: string) {
    super(message);
    this.name = 'genericError';
  }
}

export default GenericError;
