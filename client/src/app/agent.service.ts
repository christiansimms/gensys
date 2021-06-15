import {Injectable} from '@angular/core';
import {isUndefined} from './utils';

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

  getBottomValue(xOffset: number, yOffset: number): AgentList {
    return this.agentService.getBottomValue(this.position.x + xOffset, this.position.y + yOffset);
  }

  abstract doStep(): void;
}

class BlobAgent extends Agent {
  doStep(): void {
    // Do nothing if we have a value.
    if (this.getBottomValue(0, 0)) {
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

class AgentList {
  agents: Agent[] = [];
  toString(): string {
    return 'agents';
  }

  indexOf(agent: Agent): number {
    return this.agents.indexOf(agent);
  }

  splice(start: number, count: number): void {
    this.agents.splice(start, count);
  }

  push(agent: Agent): void {
   this.agents.push(agent) ;
  }
}

// 3d array of a list of agents.
export type Grid = AgentList[][][];

// const agents: {[key: string]: Agent} = {
//   blob: BlobAgent,
// };

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  agentIndex: {[key: number]: Agent} = {};
  dataLayers: Grid = [];

  constructor() {
  }

  setDataLayers(dataLayers: Grid): void {
    this.dataLayers = dataLayers;
  }

  getBottomValue(x: number, y: number): any {
    return this.dataLayers[0][y][x];
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
    // Remove from spreadsheet if on spreadsheet.
    if (agent.position) {
      // Validate new position.
      if (isUndefined(this.dataLayers[z])
        || isUndefined(this.dataLayers[z][y])
        || isUndefined(this.dataLayers[z][y][x])
      ) {
        console.error(`Skip bad move of agent ${agent.uniqueId}: ${x}, ${y}, ${z}`);
        return;
      }

      const arrIndex = this.dataLayers[agent.position.z][agent.position.y][agent.position.x].indexOf(agent);
      if (arrIndex < 0)  {
        throw new Error('Did not find agent in spreadsheet');
      }
      this.dataLayers[agent.position.z][agent.position.y][agent.position.x].splice(arrIndex, 1);
    }

    // Update agent.
    console.log(`Moving agent to: ${x}, ${y}, ${z}`);
    agent.position = {x, y, z};

    // Add to spreadsheet.
    this.dataLayers[agent.position.z][agent.position.y][agent.position.x].push(agent);
  }
}
