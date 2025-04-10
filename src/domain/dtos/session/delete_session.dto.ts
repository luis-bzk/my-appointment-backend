export class DeleteSessionDto {
  public jwt: string;

  constructor(jwt: string) {
    this.jwt = jwt;
  }

  static create(object: { [key: string]: any }): [string?, DeleteSessionDto?] {
    const { jwt } = object;

    if (!jwt) return ['El JWT es necesario'];

    return [undefined, new DeleteSessionDto(jwt)];
  }
}
