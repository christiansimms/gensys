import {Injectable} from '@angular/core';

class Agent {
  constructor() {
  }
}

class BlobAgent extends Agent {
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

  constructor() {
  }

  run(dataLayers: any[], name: string): void {
    const agent = makeAgent(name);
    const layer1 = dataLayers[1];
    layer1[0][0] = agent;
  }
}
