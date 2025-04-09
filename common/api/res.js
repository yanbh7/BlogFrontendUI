class ApiResponse {
  constructor({ data = null, message = '', status = 1 }) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  isSuccess() {
    return this.status === 1;
  }

  showError() {
    return this.isSuccess() ? '' : this.message;
  }
}

export default ApiResponse;
