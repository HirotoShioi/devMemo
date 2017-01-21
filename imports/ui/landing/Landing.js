import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './Landing.html';

TemplateController('Landing', {
  onCreated() {
    Session.set('Title', {name: "iine!!"});
  },
});
