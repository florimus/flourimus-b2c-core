import { createUserRequest } from '@fixtures/user.service.fixtures';
import userService from '@service/user.service';

describe('registerUser', () => {
  it('should return a successful response with expected data', async () => {
    const response = await userService.registerUser(createUserRequest);
    expect(response).toBeDefined();
  });
});
