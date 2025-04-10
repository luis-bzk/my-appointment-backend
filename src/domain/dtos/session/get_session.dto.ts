export class GetSessionDto {
  public jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }

  static create(object: { [key: string]: any }): [string?, GetSessionDto?] {
    const { jwt } = object;

    if (!jwt) return ['El JWT es necesario'];

    return [undefined, new GetSessionDto(jwt)];
  }
}
