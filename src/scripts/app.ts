import {createApp} from 'vue';
import registerPlugins from '@scripts/plugins/app';
import RootComponent from '@components/RootComponent.vue';

const APP = createApp(RootComponent);
registerPlugins(APP);

export default APP;
