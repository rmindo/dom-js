import dom from './dom';

// Components
import app from './src/app';
import users from './src/views/users';
import forms from './src/views/forms';
import reports from './src/views/reports';
import segments from './src/views/segments';
import dashboard from './src/views/dashboard';
import analytics from './src/views/analytics';
import campaigns from './src/views/campaigns';
import automations from './src/views/automations';


dom.set('/', dashboard);
dom.set('/users', users);
dom.set('/forms', forms);
dom.set('/reports', reports);
dom.set('/segments', segments);
dom.set('/analytics', analytics);
dom.set('/campaigns', campaigns);
dom.set('/automations', automations);


dom.run('container', app);