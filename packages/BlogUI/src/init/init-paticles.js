import Particles from '@tsparticles/vue3';
import { loadSlim } from '@tsparticles/slim';

export const initParticles = () => ({
  plugin: Particles,
  options: {
    init: async (engine) => {
      await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
    },
  },
});
