import '../../stylesheets/style.less';

import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
// partials
import './component/Footer.html';
import './component/Header.js';
import '../partials/Overlay.js';

import './LoginLayout.html';

TemplateController('LoginLayout', {
  onCreated() {
    Session.set('shouldHeaderBeShownAtFullWindow', false);
    Session.set('Title', {name: "Memoli"});
  },
});
