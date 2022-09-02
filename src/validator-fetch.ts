import axios from "axios";

export class NodeFetcher {
  private BASE_URL: string;
  constructor(NODE_IP?: string) {
    if (NODE_IP) this.BASE_URL = `http://${NODE_IP}:3030`;
    else this.BASE_URL = "https://rpc.mainnet.near.org";
  }

  async checkValidators() {
    const data = {
      jsonrpc: "2.0",
      id: "dontcare",
      method: "validators",
      params: [null],
    };
    const response = await axios.post(this.BASE_URL, data);
    return response.data;
  }
}
