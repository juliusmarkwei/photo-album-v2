import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    name: string;

    @Column("text")
    description: string;

    @Column()
    category: string;

    @Column()
    url: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    uploadedAt: Date;
}
