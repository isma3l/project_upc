import App from '@/app';
import { AuthRoute, ProjectRoute, TokenRoute } from './routes';

const app = new App([new AuthRoute(), new ProjectRoute(), new TokenRoute()]);

app.listen();
