import dom from '../Markup';

// Components
import App from './components/app';
import Users from './components/users';
import Forms from './components/forms';
import Reports from './components/reports';
import Segments from './components/segments';
import Dashboard from './components/dashboard';
import Analytics from './components/analytics';
import Campaigns from './components/campaigns';
import Automations from './components/automations';


dom.set('/', Dashboard);
dom.set('/users', Users);
dom.set('/forms', Forms);
dom.set('/reports', Reports);
dom.set('/segments', Segments);
dom.set('/analytics', Analytics);
dom.set('/campaigns', Campaigns);
dom.set('/automations', Automations);


dom.run('container', App);