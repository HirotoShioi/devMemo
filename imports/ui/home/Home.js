import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './Home.html';

TemplateController('Home', {
  onCreated() {
    Session.set('Title', {name: "DevMemo"});
  },
});
