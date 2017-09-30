import generate from './generate';
import kill from './kill';

export default function routes(app) {
  app.use('/api/v1/generate-mammal', generate);
  app.use('/api/v1/kill', kill);
  // app.use('/api/v1/', (req, res, next) => {});
}
