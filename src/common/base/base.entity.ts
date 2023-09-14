import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateUtils } from '../utils/date.utils';

export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // 排除字段
    shield: Array<string> = [];

    // 内部删除排除的字段
    private _deleteConfidential(names: string[], data: any) {
        names.forEach((name) => delete data[name]);
        return data;
    }

    public serialization(): any {
        this.shield.push('shield');
        const data = DateUtils.convertDatesToTimestamps(this);
        return this._deleteConfidential(this.shield, data);
    }

    public fromJson(json: any): any {
        Object.assign(this, json);
        return this;
    }

    public toJson(): any {
        return this.serialization();
    }
}
