import { EstateEntity } from './estateInfo.entity';
export declare class UserEntity {
    id: number;
    email: string;
    fullName: string;
    phone: string;
    place: string;
    password: string;
    updatedDate: Date;
    createdDate: Date;
    estateEntities: EstateEntity[];
}
