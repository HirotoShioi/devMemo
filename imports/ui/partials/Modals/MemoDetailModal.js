import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { Session } from 'meteor/session';

import './MemoDetailModal.html';

TemplateController('MemoDetailModal', {
  state: {
    memo: {},
    label: {},
    shouldHeartHightlight: false,
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
    },
    shouldArchiveShow() {
      if (this.state.memo.status === "active" && this.state.memo.isFavorited === false) {
        return true;
      } else {
        return false;
      }
    },
    shouldFavoriteHightlight() {
      return ( this.state.shouldHeartHightlight || this.state.memo.isFavorited );
    },
  },

  events: {
    'mouseover .heart'() {
      this.state.shouldHeartHightlight = true;
    },
    'mouseout .heart'() {
      this.state.shouldHeartHightlight = false;
    },
    'click .heart'() {
      Meteor.call('updateFavorite', this.state.memo);
    },
  },
});
