import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { Session } from 'meteor/session';

import './MemoDetailModal.html';

TemplateController('MemoDetailModal', {
  state: {
    memo: {},
    label: {},
  },
  onCreated() {
    const self = this;
    self.autorun(()=>{
      self.subscribe('memos');
    });
  },
  helpers: {
    memo() {
      let memo = Memos.findOne({_id: Session.get('MemoDetailId')});
      this.state.memo = memo;
      if (memo) {
        this.state.label = memo.label();
      }
      return memo;
    },
    truncate() {
      if (this.state.memo) {
        if (this.state.memo.desc.length > 100) {
          this.state.memo.desc = `${this.state.memo.desc.substring(0, 100)}...`;
        }
        return this.state.memo.desc;
      } else {
        return false;
      }
    }
  },
});
