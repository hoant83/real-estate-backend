import { UserEntity } from './user.entity';
export declare class EstateEntity {
    id: number;
    name: string;
    category: string;
    price: number;
    bed: number;
    toilet: number;
    pool: boolean;
    imgUrl: string[];
    m2: number;
    widthStreet: string;
    otoStreet: boolean;
    gerion: string;
    status: number;
    notification: string;
    type: string;
    updatedDate: Date;
    createdDate: Date;
    userEntities: UserEntity[];
}
