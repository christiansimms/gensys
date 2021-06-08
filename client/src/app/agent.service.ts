import {Injectable} from '@angular/core';

abstract class Agent {
  constructor() {
  }

  abstract doStep(): void;
}

class BlobAgent extends Agent {
  doStep(): void {

  }
}

function makeAgent(name: string): Agent {
  switch (name) {
    case 'blob':
      return new BlobAgent();
    default:
      throw new Error(`Unknown agent: ${name}`);
  }
}

// const agents: {[key: string]: Agent} = {
//   blob: BlobAgent,
// };

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  dataLayers: any[] = [];

  constructor() {
  }

  setDataLayers(dataLayers: any[]): void {
    this.dataLayers = dataLayers;
  }

  run(name: string): void {
    const agent = makeAgent(name);
    const layer1 = this.dataLayers[1];
    layer1[0][0] = agent;
  }
}
