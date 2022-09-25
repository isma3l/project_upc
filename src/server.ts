import App from '@/app';
import { AuthRoute, ProjectRoute } from '@routes';

const app = new App([new AuthRoute(), new ProjectRoute()]);

app.listen();
