import * as crypto from 'crypto';

export class GeneratorValues {
  static passwordGenerator(): string {
    const specialCharacters = '!@#$%^&*()_-+=<>?/[]{}|';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = lowercaseLetters.toUpperCase();
    const numbers = '0123456789';
    let password = '';

    for (let i = 0; i < 10; i++) {
      let opciones = '';
      opciones += this.getRandomCharacter(lowercaseLetters);
      opciones += this.getRandomCharacter(uppercaseLetters);
      opciones += this.getRandomCharacter(numbers);
      opciones += this.getRandomCharacter(specialCharacters);

      password += this.getRandomCharacter(opciones);
    }
    return password;
  }

  static tokenGenerator() {
    const randomBytes = crypto.randomBytes(30);
    return randomBytes.toString('hex');
  }

  private static getRandomCharacter(val: string): string {
    const randomIndex = Math.floor(Math.random() * val.length);
    return val[randomIndex];
  }
}
