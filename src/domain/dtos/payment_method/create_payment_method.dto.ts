export class CreatePaymentMethodDto {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  static create(body: {
    [key: string]: any;
  }): [string?, CreatePaymentMethodDto?] {
    const { name, description } = body;

    if (!name) return ['El nombre es requerido'];
    if (name.length > 100)
      return ['El nombre no puede tener mas de 100 caracteres'];

    if (!description) return ['La descripción es requerida'];
    if (description.length > 300)
      return ['La descripción no puede tener mas de 100 caracteres'];

    return [
      undefined,
      new CreatePaymentMethodDto(name.toLowerCase(), description.toLowerCase()),
    ];
  }
}
