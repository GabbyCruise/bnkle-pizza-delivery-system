/* eslint-disable class-methods-use-this */
class Responses {
  successResponse(message, data) {
    return {
      status: true,
      // code: 200,
      message,
      data,
      error: null
    };
  }

  errorResponse(error) {
    return {
      status: false,
      // code: 500,
      message: error.message,
      data: null,
      error
    };
  }
}

module.exports = new Responses();
