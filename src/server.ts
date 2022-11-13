import App from '@/app';
import { AuthRoute, ProjectRoute, TokenRoute, ContractRoute } from './routes';

const app = new App([new AuthRoute(), new ProjectRoute(), new TokenRoute(), new ContractRoute()]);

app.listen();
