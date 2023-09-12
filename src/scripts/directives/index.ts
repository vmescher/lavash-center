import {vMaska} from 'maska';
import {App} from 'vue';
import clickOutside from '@scripts/directives/clickOutside';
import animate from '@scripts/directives/animate';
import sizeObserve from '@scripts/directives/sizeObserve';

export default function useDirectives(AppInstance: App) {
	AppInstance.directive('mask', vMaska)
		.directive('click-outside', clickOutside)
		.directive('animate', animate)
		.directive('size-observe', sizeObserve);
	return AppInstance;
}
