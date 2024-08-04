import { boot } from 'quasar/wrappers';
import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';

export default boot(({ app }) => {
  app.use(Particles, {
    init: async (engine) => {
      await loadSlim(engine);
    },
  });
});
