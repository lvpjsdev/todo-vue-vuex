import type { Filter, Task } from '../types';

export interface State {
  tasks: Task[];
  isPending: boolean;
  filter: Filter;
  errMsg: string;
}
