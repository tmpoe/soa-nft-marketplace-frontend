import { ethers, ZeroAddress } from 'ethers';
import type { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
	}
}

async function connectWallet() {
	let userAddress = ZeroAddress;
	if (window.ethereum) {
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // use the request method to get the accounts, aka logging in to Metamask
		if (!accounts || !accounts.hasOwnProperty('length')) {
			return;
		}
		if (accounts && accounts.hasOwnProperty('length') && accounts.length) {
			// it returns an array of accounts, it should have at least 1 element
			userAddress = accounts[0]; // update the state
		} else {
			alert('No ethereum accounts found');
		}
	} else {
		const provider = new ethers.JsonRpcProvider(url);
	}
}
