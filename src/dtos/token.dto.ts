export class TokenDto {
  public _id: string;
  public address: string;
  public name: string;
  public network_name: string;

  constructor(id: string, address: string, name: string, network_name: string) {
    this._id = id;
    this.address = address;
    this.name = name;
    this.network_name = network_name;
  }
}
