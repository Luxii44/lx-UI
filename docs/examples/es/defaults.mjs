import { makeInstaller } from './make-installer.mjs';
import Components from './component.mjs';

var installer = makeInstaller([
  ...Components
  /*, ...Plugins*/
]);

export { installer as default };
//# sourceMappingURL=defaults.mjs.map
