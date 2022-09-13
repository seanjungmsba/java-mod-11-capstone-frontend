/* stores information of each customer such as name and email address */
export class Customer {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string
  ) {}
}
