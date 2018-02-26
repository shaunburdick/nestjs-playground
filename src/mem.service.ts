import * as shortid from 'shortid';
import * as firstBy from 'thenby';

export class MemoryService<T> {
  static parseSort(sorts: string): Array<{ key: string; direction: number; }> {
    return sorts.split(',')
      .map((sortCmd) => {
        const splits = sortCmd.split(':');
        return {
          key: splits[0],
          direction: parseInt(splits[1], 10)
        };
      });
  }

  protected data: T[] = [];

  async create(dto: any): Promise<T> {
    const idx = this.data.push({
      id: shortid.generate(),
      ...dto
    });

    return this.data[idx - 1];
  }

  async findAll(opts: FilterSortOpts): Promise<Page<T>> {
    return this.filterAndSort(this.data, opts);
  }

  async find(id: string): Promise<T | undefined> {
    return this.data.find((record) => (<any>record).id === id);
  }

  async remove(id: string): Promise<void> {
    this.data = this.data.filter((record) => (<any>record).id !== id);
  }

  protected filterAndSort<F>(targetData: F[], opts: FilterSortOpts): Page<F> {
    let data = targetData.slice();
    const totalCount = data.length;

    if (opts.sort && opts.sort.length) {
      data.sort(opts.sort.reduce((sortFn, sortDef) => {
        if (sortFn === undefined) {
          return firstBy((item) => item[sortDef.key], sortDef.direction);
        } else {
          return (sortFn as any).thenBy((item) => item[sortDef.key], sortDef.direction);
        }
      }, undefined));
    }

    if (opts.offset) {
      data = data.slice(opts.offset);
    }

    if (opts.limit) {
      data = data.slice(0, opts.limit);
    }

    return {
      totalCount,
      data
    };
  }
}

export class Page<T> {
  totalCount: number;
  data: T[];
}

export interface FilterSortOpts {
  offset?: number;
  limit?: number;
  sort?: Array<{ key: string; direction: number; }>;
}
