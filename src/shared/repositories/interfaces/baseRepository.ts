import { DeepPartial, FindManyOptions } from 'typeorm';

export interface IBaseRepository<T> {
  create(item: DeepPartial<T>): Promise<T>;
  update(item: DeepPartial<T>): Promise<T>;
  delete(item: IDeleteItemProps): Promise<T>;
  softDelete(item: ISoftDelete): Promise<void>;
  save(item: DeepPartial<T>): Promise<T>;
  saveMany(items: DeepPartial<T[]>): Promise<T[]>;
  saveList(item: DeepPartial<T>[]): Promise<T[]>;
  listWithPagination(skip: number): Promise<T[]>;
  findById(id: string): Promise<T | undefined>;
  findByIdOrFail(id: string): Promise<T>;
  findAll(is_active?: boolean): Promise<T[]>;
  find(options?: FindManyOptions<T>): Promise<T[]>;
  findByIds(ids: string[]): Promise<T[]>;
}

export interface IDeleteItemProps {
  id: string;
}

export type ISoftDelete = string | string[];
