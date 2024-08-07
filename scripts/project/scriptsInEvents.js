


const scriptsInEvents = {

	async Sdk_Event1_Act1(runtime, localVars)
	{
		runtime.globalVars.curDate = new Date().toLocaleString('en', {
		 year: 'numeric',
		 month: '2-digit',
		 day: '2-digit',
		});
	},

	async Sdk_Event2_Act1(runtime, localVars)
	{
var tonConnectUI

globalThis.tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
	manifestUrl: `${runtime.globalVars.domain}/tonconnect-manifest.json`,
	twaReturnUrl: runtime.globalVars.domain
});

console.log("TON Ready!");
runtime.callFunction("restoreTON");
	},

	async Sdk_Event3_Act1(runtime, localVars)
	{
		const connectedWallet = await tonConnectUI.connectWallet();
		runtime.globalVars.userWallet = tonConnectUI.account.address;
		console.log("Wallet:", runtime.globalVars.userWallet);
		runtime.callFunction("btnTON", 2);
	},

	async Sdk_Event4_Act1(runtime, localVars)
	{
		tonConnectUI.connectionRestored.then(restored => {
		    if (restored) {
				console.log('Connection restored');
				runtime.globalVars.userWallet = tonConnectUI.account.address;
				console.log("Wallet:", runtime.globalVars.userWallet);
				runtime.callFunction("btnTON", 2);
		    } else {
				runtime.callFunction("btnTON", 0);
		        console.log('Connection was not restored.');
		    }
		});
	},

	async Sdk_Event5_Act1(runtime, localVars)
	{
		await tonConnectUI.disconnect();
		console.log('TON disconnected');
		await new Promise(resolve => setTimeout(resolve, 250));
		runtime.callFunction("restoreTON");
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

