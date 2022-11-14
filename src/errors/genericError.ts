class GenericError extends Error {
  status: number;

  constructor (name: string, message: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export default GenericError;
