import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from "typeorm";

// @Entity('Users')
// export class User extends BaseEntity {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column('text', {nullable:true})
//     firstName: string;

//     @Column('text', {nullable:true})
//     lastName: string;

//     @Column('int', {nullable:true})
//     age: number;

//     @OneToMany(
//         type => ContactEmail
//         , (email: ContactEmail) => email.contact
//         , { eager: true, cascade: ['insert', 'update', 'remove'] }
//     )
//     public emails: ContactEmail[];

// }

@Entity('contacts')
export class Contact extends BaseEntity {
    @Column('text', { primary: true, unique: true })
    public id: string;

    @Column({ type: 'text', length: 100 })
    public first_name: string;

    @OneToMany(
        type => ContactEmail
        , (email: ContactEmail) => email['contact']
        , { eager: true, cascade: ['insert', 'update', 'remove'] }
    )
    public emails: ContactEmail[];

}

@Entity('contactEmails')
export class ContactEmail extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    public id: number;

    @Column('text')
    public value: string;

    @Column('text', { nullable: true })
    public type: string;

    @ManyToOne(type => Contact, (contact: Contact) => contact.emails)
    public contact: Contact;
}