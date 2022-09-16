import App from '@/app';
import { AuthRoute } from '@routes';

const app = new App([new AuthRoute()]);

app.listen();
