export class TokenDto {
  public address: string;
  public name: string;
  public network_name: string;

  constructor(address: string, name: string, network_name: string) {
    this.address = address;
    this.name = name;
    this.network_name = network_name;
  }
}
