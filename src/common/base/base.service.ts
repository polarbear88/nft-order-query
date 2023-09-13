import { Equal, Repository } from 'typeorm';

export class BaseService<T> {
    constructor(protected readonly repository: Repository<T>) {
        this.repository = repository;
    }

    getRepo(): Repository<T> {
        return this.repository;
    }

    async existsByField(field: string, value: any): Promise<boolean> {
        return await this.repository.exist({
            where: { [field]: Equal(value) } as any,
        });
    }

    async findByField(field: string, value: any): Promise<T> {
        return await this.repository.findOne({
            where: {
                [field]: Equal(value),
            } as any,
        });
    }

    async countByField(field: string, value: any): Promise<number> {
        return await this.repository.count({
            where: {
                [field]: Equal(value),
            } as any,
        });
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<T> {
        return await this.findByField('id', id);
    }
}
