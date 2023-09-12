// Import styles
import '@styles/main.sass';

// Import vue app
import APP from '@scripts/app';

// import vanilla modules
import initVanillaModules from '@scripts/plugins/vanilla';

document.addEventListener('DOMContentLoaded', () => {
	APP.mount('#app');
	initVanillaModules();
});
