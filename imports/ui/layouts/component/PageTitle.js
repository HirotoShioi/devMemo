import './PageTitle.html';
import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

TemplateController('PageTitle', {
  helpers: {
    title() {
      return Session.get('Title');
    }
  },
});
