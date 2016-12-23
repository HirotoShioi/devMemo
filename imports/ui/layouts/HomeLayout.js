import '../../stylesheets/style.less';

import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
// partials
import './component/Footer.html';
import './component/Header.js';

import './HomeLayout.html';

TemplateController('HomeLayout', {
  onCreated() {
    Session.set('shouldHeaderBeShownAtFullWindow', false);
  },
});
