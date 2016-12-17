import './Home.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

TemplateController('Home', {
  onCreated() {
    Session.set('Title', {name: "DevMemo"});
  },
});
