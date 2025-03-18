export class CreateCountryDto {
  public name: string;
  public code: string;
  public prefix: string;

  constructor(name: string, code: string, prefix: string) {
    this.name = name;
    this.code = code;
    this.prefix = prefix;
  }

  static create(object: { [key: string]: any }): [string?, CreateCountryDto?] {
    const { name, code, prefix } = object;

    // make validation
    if (!name) return ['El nombre del país es requerido'];
    if (name.length > 100)
      return ['El nombre del país no puede tener mas de 100 caracteres'];

    if (!code) return ['El código del país es requerido'];
    if (code.length > 10)
      return ['El código del país no puede tener mas de 10 caracteres'];

    if (!prefix) return ['El prefijo del país es requerido'];
    if (prefix.length > 10)
      return ['El prefijo del país no puede tener mas de 10 caracteres'];

    return [
      undefined,
      new CreateCountryDto(
        name.toLowerCase(),
        code.toLowerCase(),
        prefix.toLowerCase(),
      ),
    ];
  }
}
