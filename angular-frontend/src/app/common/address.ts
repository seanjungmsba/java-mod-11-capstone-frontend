/* stores customer's address when checking out items */
export class Address {
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string
  ) {}
}