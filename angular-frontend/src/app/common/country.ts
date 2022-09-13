/* stores information about each country that the product can be shipped to */
export class Country {
  constructor(public id: number, public code: string, public name: string) {}
}