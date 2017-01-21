import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './PageTitle.html';

TemplateController('PageTitle', {
  helpers: {
    title() {
      return Session.get('Title');
    },
  },
});
