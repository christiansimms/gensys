export class Counter {
  counter: Map<string, number> = new Map();

  constructor() {
  }

  addToCount(pattern: string): void {
    if (this.counter.has(pattern)) {
      this.counter.set(pattern, this.counter.get(pattern) + 1);
    } else {
      this.counter.set(pattern, 1);
    }
  }

  // Return descending sort.
  sortedCounts(): Array<[string, number]> {
    const counts: Array<[string, number]> = Array.from(this.counter);
    counts.sort((a, b) => b[1] - a[1]);
    return counts;
    // const counts: Array<[string, number]> = [];
    // for (const [key, count] of Object.entries(this.counter)) {
    //   console.log('sortedCounts: ', key, count);
    // }
  }

  size(): number {
    return this.counter.size;
  }
}

