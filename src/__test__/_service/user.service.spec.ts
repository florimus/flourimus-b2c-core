import {
  mockCreateUserRequest,
  mockCreateUserResponse,
} from '@fixtures/user.service.fixtures';
import userService from '@service/user.service';

jest.mock('@persistence/repositories/user.repository');

jest.mock('@service/user.service', () => ({
  registerUser: jest.fn().mockResolvedValue(mockCreateUserResponse),
}));

describe('registerUser', () => {
  it('should return a successful response', async () => {
    const response = await userService.registerUser(mockCreateUserRequest);
    expect(response).toBeDefined();
  });
});
