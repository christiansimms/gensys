import {Injectable} from '@angular/core';

export interface Position {
  x: number;
  y: number;
  z: number;
}

let UNIQUE_ID = 0;

abstract class Agent {
  uniqueId: number;
  position: Position;
  constructor(public agentService: AgentService) {
    // this.position = {x: 0, y: 0, z: 0};
    this.uniqueId = ++UNIQUE_ID;
  }

  getValue(xOffset: number, yOffset: number): any {
  }

  abstract doStep(): void;
}

class BlobAgent extends Agent {
  doStep(): void {
    // Do nothing if we have a value.
    if (this.getValue(0, 0)) {
      return;
    }

    // Move down diagonally.
    this.agentService.moveAgent(this, this.position.x + 1, this.position.y + 1, this.position.z);
  }

  toString(): string {
    return 'BLOB!';
  }
}

function makeAgent(name: string, agentService: AgentService): Agent {
  switch (name) {
    case 'blob':
      return new BlobAgent(agentService);
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
  agentIndex: {[key: number]: Agent} = {};
  dataLayers: any[] = [];

  constructor() {
  }

  setDataLayers(dataLayers: any[]): void {
    this.dataLayers = dataLayers;
  }

  getValue(x: number, y: number, z: number): any {
    return this.dataLayers[z][y][x];
  }

  run(name: string): void {
    {
      const agent = makeAgent(name, this);
      this.agentIndex[agent.uniqueId] = agent;
      this.moveAgent(agent, 0, 0, 1);
    }

    // Run a few times.
    setInterval(() => {
      console.log('Running step');
      Object.values(this.agentIndex).forEach(agent => {
        agent.doStep();
      });
    }, 500);
  }

  // Update 2 things when moving: agent's position, plus their spreadsheet location.
  moveAgent(agent: Agent, x: number, y: number, z: number): void {
    // Remove from spreadsheet.
    if (agent.position) {
      this.dataLayers[agent.position.z][agent.position.y][agent.position.x] = null;
      // console.log('OLD CELL:', oldCell);
    }

    // Update agent.
    console.log(`Moving agent to: ${x}, ${y}, ${z}`);
    agent.position = {x, y, z};

    // Add to spreadsheet.
    this.dataLayers[agent.position.z][agent.position.y][agent.position.x] = agent;
  }
}
