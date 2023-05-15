import { UserCTX } from '@/contexts';
import { Users } from '@/contexts/users';
import { User } from '@/models';
import { Contract } from 'fabric-contract-api';

export class UsersContract extends Contract {
	createContext() {
		return new UserCTX();
	}

	async initializationContract(ctx: UserCTX) {
		const users: Users = {
			worker: new User(0, 'worker', 'Worker'),
			user: new User(1, 'user', 'User'),
		};
		await ctx.userList.setUsers(users);
		return users;
	}

	async registration(ctx: UserCTX, login: string): Promise<User> {
		const users = await ctx.userList.getUsers();
		if (users[login]) {
			throw new Error('You are already registered');
		}
		const user = new User(Object.keys(users).length, login, 'User');
		await ctx.userList.addUser(login, user);
		return user;
	}
	async getUser(ctx: UserCTX, login: string): Promise<User | undefined> {
		return await ctx.userList.getUser(login);
	}
	async getUsers(ctx: UserCTX): Promise<Users> {
		return await ctx.userList.getUsers();
	}
}
