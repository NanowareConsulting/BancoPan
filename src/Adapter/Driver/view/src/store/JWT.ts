import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const JWT = writable((browser && localStorage.getItem('JWT')) || '');
JWT.subscribe((val) => {
	if (browser) return localStorage.setItem('JWT', val);
});
