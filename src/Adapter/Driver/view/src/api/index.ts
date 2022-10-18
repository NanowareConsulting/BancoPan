import { notifier } from '@beyonk/svelte-notifications';

import { browser } from '$app/environment';
import axios from 'axios';
import { JWT } from '../store/JWT';

export abstract class API {
	private static axios = axios.create({
		baseURL: 'http://localhost:3000'
	});

	public static async getOldDashboard() {
		try {
			JWT.subscribe((val) => {
				this.axios.defaults.headers.Authorization = `Bearer ${val}`;
			});

			const oldUser = await this.axios.get(`/get-old-user`);
			const oldCreditCard = await this.axios.get(`/get-old-credit-card`);
			const oldLoan = await this.axios.get(`/get-old-loans`);

			return {
				user: oldUser.data,
				creditCard: oldCreditCard.data,
				loan: oldLoan.data
			};
		} catch (error) {
			if (browser) {
				localStorage.removeItem('JWT');
				window.location.href = '/';
			}
			throw error;
		}
	}

	public static async registerOldUser(user: {
		cpf: string;
		name: string;
		email: string;
		password: string;
	}) {
		try {
			const response = await this.axios.post('/register-old-user', user);
			if (browser) {
				localStorage.setItem('JWT', response.data.token);
				window.location.href = '/user';
				notifier.success('Old user created!', 2000);
			}
		} catch (error: any) {
			notifier.warning(error.response.data, 2000);
			throw error;
		}
	}

	public static async loginOldUser(user: { cpf: string; password: string }) {
		try {
			const response = await this.axios.post('/login-old-user', user);
			if (browser) {
				localStorage.setItem('JWT', response.data.token);
				window.location.href = '/user';
			}
		} catch (error: any) {
			notifier.warning(error.response.data, 2000);
			throw error;
		}
	}

	public static async registerNewUser(user: { name: string; email: string; password: string }) {
		try {
			JWT.subscribe((val) => {
				this.axios.defaults.headers.Authorization = `Bearer ${val}`;
			});
			return await this.axios.post('/register-user', user);
		} catch (error: any) {
			notifier.warning(error.response.data, 2000);
			throw error;
		}
	}

	public static async applyForOldCreditCard(user: { email: string }) {
		try {
			JWT.subscribe((val) => {
				this.axios.defaults.headers.Authorization = `Bearer ${val}`;
			});

			const response = await this.axios.post('/apply-for-old-credit-card', user);
			return response;
		} catch (error: any) {
			notifier.warning(error.response.data, 2000);
			throw error;
		}
	}

	public static async applyForOldLoan(data: { email: string; amount: number }) {
		try {
			JWT.subscribe((val) => {
				this.axios.defaults.headers.Authorization = `Bearer ${val}`;
			});

			const response = await this.axios.post('/apply-for-old-loan', data);
			return response;
		} catch (error: any) {
			notifier.warning(error.response.data, 2000);
			throw error;
		}
	}
}
