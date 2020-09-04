//Error Interceptor Messages
export class ErrorInterceptor {
  static ERROR_401 = "Token has expired or you should be logged in!";
  static ERROR_404 = "404";
  static UNEXPECTED_ERROR = "Unexpected error!";
}

//Auth Messages
export class Auth{
  static SUCCESSFULL_LOGIN = "Successfully logged!";
  static SUCCESSFULL_REGISTER = "Successfully registed!";
}

//Event Messages
export class Event{
  static SUCCESSFULL_CREATE = "Successfully created!";
  static SUCCESSFULL_EDIT = "Successfully edited!";
  static SUCCESSFULL_DELETE = "Successfully deleted!";
}

//Profile Messages
export class Profile{
  static SUCCESSFULL_UPLOAD = "Successfully uploaded!";
  static ERROR_400 = "Something went wrong! Please try again!";
}

//Post Messages
export class Post{
  static SUCCESSFULL_CREATE = "Successfully created!";
  static SUCCESSFULL_DELETE = "Successfully deleted!";
  static ERROR_400 = "Please check you post!";
}
