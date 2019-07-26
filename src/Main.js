import dom from '../Markup';

// Components
import App from './App/App';
import Users from './App/Users';
import Forms from './App/Forms';
import Reports from './App/Reports';
import Segments from './App/Segments';
import Dashboard from './App/Dashboard';
import Analytics from './App/Analytics';
import Campaigns from './App/Campaigns';
import Automations from './App/Automations';


dom.set('/', Dashboard);
dom.set('/users', Users);
dom.set('/forms', Forms);
dom.set('/reports', Reports);
dom.set('/segments', Segments);
dom.set('/analytics', Analytics);
dom.set('/campaigns', Campaigns);
dom.set('/automations', Automations);


// const routes = {
// 	'/': Dashboard,
// 	'users': Users,
// 	'/forms': Forms,
// 	'/reports': Reports,
// 	'/segments': Segments,
// 	'/analytics': Analytics,
// 	'/campaigns': Campaigns,
// 	'/automations': Automations,
// };


dom.run('container', App);