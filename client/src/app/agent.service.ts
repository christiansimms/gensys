import {Injectable} from '@angular/core';

export interface Position {
  x: number;
  y: number;
  z: number;
}

abstract class Agent {
  position: Position;
  constructor(public agentService: AgentService) {
    // this.position = {x: 0, y: 0, z: 0};
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

    // Look around to move.

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
  dataLayers: any[] = [];

  constructor() {
  }

  setDataLayers(dataLayers: any[]): void {
    this.dataLayers = dataLayers;
  }

  run(name: string): void {
    const agent = makeAgent(name, this);
    this.moveAgent(agent, 0, 0, 1);
  }

  // Update 2 things when moving: agent's position, plus their spreadsheet location.
  private moveAgent(agent: Agent, x: number, y: number, z: number): void {
    // Remove from spreadsheet.
    if (agent.position) {
      const oldCell = this.dataLayers[agent.position.z][agent.position.y][agent.position.x];
      console.log('OLD CELL:', oldCell);
    }

    // Update agent.
    console.log(`Moving agent to: ${x}, ${y}, ${z}`);
    agent.position = {x, y, z};

    // Add to spreadsheet.
    this.dataLayers[agent.position.z][agent.position.y][agent.position.x] = agent;
  }
}
