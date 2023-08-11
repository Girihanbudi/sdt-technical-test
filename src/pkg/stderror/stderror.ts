export class StdError {
  error?: Error; // error object for server

  status: number; // error status code
  type?: string; // link to error documentation
  title: string; // error title
  errors?: any[]; // error message for client

  constructor(code: number, ...messages: any[]) {
    let title: string = "";
    messages.forEach((msg, i) => {
      if (i == 0) {
        title = title + String(msg);
      } else {
        title = title + " " + String(msg);
      }
    });

    this.status = code;
    this.title = title;
  }

  setError = (err: Error): StdError => {
    this.error = err;
    this.title = err.message;
    return this;
  };

  setErrorFromString = (msg: string): StdError => {
    const err = new Error(msg);
    this.error = err;
    this.title = msg;
    return this;
  };

  addErrors = (errors: any): StdError => {
    this.errors = errors;
    return this;
  };

  toJSON() {
    return {
      status: this.status,
      type: this.type,
      title: this.title,
      errors: this.errors,
    };
  }
}

export interface StdInvalidParam {
  name: string;
  reason: string;
}

export default StdError;
