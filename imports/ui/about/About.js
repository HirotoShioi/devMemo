import { $ } from 'meteor/jquery';
import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';

import './About.html';

TemplateController('About', {
  onCreated() {
    Session.set('Title', {name: "About"});
  },
  onRendered() {
    this.autorun(()=>{
      this.$('.toc-wrapper').pushpin({ top: this.$('.toc-wrapper').offset().top });
      this.$('.scrollspy').scrollSpy();
    });
  },
});
