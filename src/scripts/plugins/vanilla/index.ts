import initMediaAutoWrapper from '@scripts/plugins/vanilla/utils/mediaAutoWrapper';
import calcAppProperties from '@scripts/plugins/vanilla/modules/calcProperties';

export default function initVanillaModules() {
	initMediaAutoWrapper();
	calcAppProperties();
}
