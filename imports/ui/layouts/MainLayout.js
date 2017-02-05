import { TemplateController } from 'meteor/space:template-controller';
import { Session } from 'meteor/session';
import '../../stylesheets/style.less';
import { rwindow } from 'meteor/gadicohen:reactive-window';
// partials
import './component/Header.js';
import './component/SideNav.js';
import './component/PageTitle.js';
import '../partials/Overlay.js';
import '../partials/SearchBar/SearchBar.js';
import '../partials/LabelBar/labelBar.js';
import '../partials/Modals/Modals.js';
import { resetModalForm } from '../partials/Modals/modalHelper';
import './MainLayout.html';

TemplateController('MainLayout', {
  onCreated() {
    Session.set('shouldHeaderBeShownAtFullWindow', true);
  },

  helpers: {
    shouldSearchBarShow() {
      if (rwindow.$width() >= 992) {
        if (Session.get('isSearchNavShown') || Session.get('isShrinkedSideNavShown')) {
          Session.set('isShrinkedSideNavShown', false);
          Session.set('isSearchNavShown', false);
        }
      }
      if (rwindow.$width() <= 992) {
        if (Session.get('isSearching') || Session.get('labelBarShow')) {
          Session.set('isSearching', false);
          Session.set('labelBarShow', false);
        }
        return false;
      } else {
        return true;
      }
    },
  },

  events: {
    'click .main-layout'() {
      if (rwindow.$width() <= 992) {
        Session.set('isShrinkedSideNavShown', false);
        resetModalForm();
      }
    }
  }
});
