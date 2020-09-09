export class User {
  static FIRST_NAME_MAX_LENGTH = 50;
  static FIRST_NAME_MIN_LENGTH = 2;
  static LAST_NAME_MAX_LENGTH = 50;
  static LAST_NAME_MIN_LENGTH = 2;
  static PASSWORD_MIN_LENGTH = 6;
  static MOBILE_MIN_LENGTH = 10;
  static MOBILE_MAX_LENGTH = 15;
  static FACEBOOK_URL_MIN_LENGTH = 25;
}

export class Event {
  static TITLE_MAX_LENGTH = 50;
  static TITLE_MIN_LENGTH = 2;
  static SPORT_MAX_LENGTH = 60;
  static SPORT_MIN_LENGTH = 2;
  static LOCATION_MIN_LENGTH = 2;
  static AVAILABLE_POSITIONS_MIN_LENGTH = 1;
}

export class Position {
  static TITLE_MAX_LENGTH = 60;
  static TITLE_MIN_LENGTH = 2;
}

export class Publication {
  static DESCRIPTION_MAX_LENGTH = 200;
}
