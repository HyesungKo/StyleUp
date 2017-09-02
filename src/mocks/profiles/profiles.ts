import { Profile } from './../../models/profile/profile.interface';

const userList: Profile[] = [
    {
        firstName: 'Hyesung',
        lastName: 'Ko',
        avatar: 'assets/img/avatar.png',
        email: 'Hyesung@ko.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Yunsung',
        lastName: 'Ko',
        avatar: 'assets/img/avatar.png',
        email: 'Yunsung@ko.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'Jozef',
        lastName: 'T',
        avatar: 'assets/img/avatar.png',
        email: 'jozef@T.com',
        dateOfBirth: new Date()
    },
    {
        firstName: 'BY',
        lastName: 'Yong',
        avatar: 'assets/img/avatar.png',
        email: 'By@young.com',
        dateOfBirth: new Date()
    }
];

export const USER_LIST = userList; 