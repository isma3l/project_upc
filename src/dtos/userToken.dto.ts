export class UserTokenDto {
  public address: string;
  public network_name: string;
  public tokenId: string;

  constructor(address: string, network_name: string, tokenId: string) {
    this.address = address;
    this.network_name = network_name;
    this.tokenId = tokenId;
  }
}
