import axios from 'axios';

export abstract class API {
	private static axios = axios.create({
		baseURL: 'http://localhost:3000'
	});

	public static async getOldDashboard(cpf: string) {
		const oldUser = await this.axios.get(`/get-old-user/${cpf}`);
		const oldCreditCard = await this.axios.get(`/get-old-credit-card/${cpf}`);
		const oldLoan = await this.axios.get(`/get-old-loans/${cpf}`);

		return {
			user: oldUser.data,
			creditCard: oldCreditCard.data,
			loan: oldLoan.data
		};
	}

	public static async registerOldUser(user: {
		cpf: string;
		name: string;
		email: string;
		password: string;
	}) {
		return await this.axios.post('/register-old-user', user);
	}

	public static async loginOldUser(user: { cpf: string; password: string }) {
		try {
			const token = await this.axios.post('/login-old-user', user);
		} catch (error) {
			throw error;
		}
	}

	public static async registerNewUser(user: {
		cpf: string;
		name: string;
		email: string;
		password: string;
	}) {
		return await this.axios.post('/register-user', user);
	}
}
