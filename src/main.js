import App from './App.svelte';

window.onload = () => {
	'use strict';
  
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker
			   .register('./sw.js');
	}
  }

const app = new App({
	target: document.body
});

export default app;