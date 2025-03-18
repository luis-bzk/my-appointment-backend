export class Validators {
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }

  static get passwordLowerCase() {
    return /[a-z]/;
  }

  static get passwordUpperCase() {
    return /[A-Z]/;
  }

  static get passwordNumbers() {
    return /[0-9]/;
  }

  static get passwordSpecialChars() {
    return /[@$!%*#?&]/;
  }

  static get url() {
    // Expresión regular para validar URLs
    return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/.*)?$/i;
  }
}
