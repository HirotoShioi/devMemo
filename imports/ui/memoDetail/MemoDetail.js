import './MemoDetail.html';
import { TemplateController } from 'meteor/space:template-controller';
import { i18n } from 'meteor/anti:i18n';
import { Session } from 'meteor/session';
import { Memos } from '../../api/memos.js';
import '../partials/Loading.js';

TemplateController('MemoDetail', {
  state: {
    memo: '',
  },

  helpers: {
    memo() {
      this.state.memo = Memos.findOne({_id: this.data._id});
    }
  },
  events: {
    'click .memo-detail-url'() {
      window.open(this.state.memo.url, '_blank');
      return false;
    }
  },
});
