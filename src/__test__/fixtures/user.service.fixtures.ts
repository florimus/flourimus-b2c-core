import { CreateUserRequest, User } from '@core/types';
import roles from '@core/enums/user.roles';

export const mockCreateUserRequest: CreateUserRequest ={
    firstName: 'john',
    lastName: 'david',
    email: 'john.david@example.com',
    password: 'john@123'
};

export const mockCreateUserResponse: User = {
    _id: '0a82a7bb-8738-4e3e-b7d9-c9c371f5bff6',
    firstName: 'john',
    email: 'john.david@example.com',
    role: roles.CUSTOMER,
    isBlocked: false,
    loginType: 'password',
    isActive: true,
    version: 1,
};