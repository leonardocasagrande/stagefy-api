import AppError from '@shared/errors/appError';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import {
  IBaseRepository,
  IDeleteItemProps,
  ISoftDelete,
} from './interfaces/baseRepository';

export abstract class BaseRepository<Entity extends DeepPartial<Entity>>
  implements IBaseRepository<Entity>
{
  readonly ormRepository: Repository<Entity>;

  constructor(ormRepository: Repository<Entity>) {
    this.ormRepository = ormRepository;
  }

  public async listWithPagination(skip: number): Promise<Entity[]> {
    return this.ormRepository.find({
      where: {
        is_active: true,
      },
      skip,
      take: 10,
    });
  }

  public async saveList(item: DeepPartial<Entity>[]): Promise<Entity[]> {
    return this.ormRepository.save(item);
  }

  public async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.ormRepository.find(options);
  }

  async save(item: Entity): Promise<Entity> {
    return this.ormRepository.save(item);
  }

  public async saveMany(items: DeepPartial<Entity[]>): Promise<Entity[]> {
    const itemsData = items as Entity[];

    const savedItems = this.ormRepository.save(itemsData);

    return savedItems;
  }

  async create(item: Entity): Promise<Entity> {
    const item_to_save = await this.ormRepository.create(item);

    const item_saved = await this.ormRepository.save(item_to_save);

    return item_saved;
  }

  async update(item: Entity): Promise<Entity> {
    try {
      const preloadedItem = await this.ormRepository.preload(item);

      if (preloadedItem) {
        return this.ormRepository.save(preloadedItem);
      }
      throw new AppError('Entidade inexistente no banco de dados.', 500);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw new AppError('Erro ao atualizar entidade.', 500, error);
    }
  }

  async delete(item: IDeleteItemProps): Promise<Entity> {
    if (!item.id) {
      throw new AppError('O Id do item é obrigatório.');
    }

    const findItem = await this.ormRepository.findOne(item.id);

    if (!findItem) {
      throw new AppError('Item não encontrado.');
    }

    const inactiveItem = {
      ...findItem,
      is_active: false,
    };

    const deleted_item = await this.ormRepository.save(inactiveItem);

    return deleted_item;
  }

  async findAll(is_active = false): Promise<Entity[]> {
    if (is_active) {
      return this.ormRepository.find({
        where: {
          is_active: true,
        },
      });
    }

    return this.find();
  }

  async findById(id: string): Promise<Entity | undefined> {
    const item = await this.ormRepository.findOne(id);

    return item;
  }

  async findByIdOrFail(id: string): Promise<Entity> {
    const item = await this.ormRepository.findOneOrFail(id);

    return item;
  }

  async findByIds(ids: string[]): Promise<Entity[]> {
    const items = await this.ormRepository.findByIds(ids);

    return items;
  }

  async softDelete(item_id: ISoftDelete): Promise<void> {
    await this.ormRepository.softDelete(item_id);
  }
}
