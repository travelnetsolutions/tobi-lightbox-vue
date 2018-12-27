// tslint:disable:forin
import { Components } from './components/index';

export const TobiLightboxPlugin = {
  install(Vue: any) {

    if (Vue._Tobi_Lightbox_Components_installed) {
      return;
    }

    Vue._Tobi_Lightbox_Components_installed = true;

    // Register component plugins
    for (const plugin in Components) {
      Vue.component(plugin, Components[plugin]);
    }
  },
};

// Window must be cast as any to allow for looking for the Vue property
if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(TobiLightboxPlugin);
}

export default TobiLightboxPlugin;
