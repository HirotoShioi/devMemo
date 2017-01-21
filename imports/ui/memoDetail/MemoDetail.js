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

  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('singleMemo', self.data._id);
      self.state.memo = Memos.findOne({_id: self.data._id});
    });
    Session.set('Title', {name: i18n('pageTitle.memoDetail')});
  },

  events: {
    'click .memo-detail-url'() {
      window.open(this.state.memo.url, '_blank');
      return false;
    }
  },
});
