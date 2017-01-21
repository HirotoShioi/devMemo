import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { Session } from 'meteor/session';
import { resetModalForm } from './modalHelper.js';
import { moment } from 'meteor/momentjs:moment';
import { i18n } from 'meteor/anti:i18n';

import './MemoDetailModal.html';

TemplateController('MemoDetailModal', {
  state: {
    memo: {},
    label: {},
    shouldHeartHightlight: false,
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
    isOwner() {
      if (this.state.memo) {
        if (Meteor.userId() === this.state.memo.owner) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
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
      if (this.state.memo) {
        if (this.state.memo.status === "active" && !this.state.memo.favoritedAt && this.state.memo.owner === Meteor.userId()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    shouldFavoriteHightlight() {
      if (this.state.memo) {
        return ( this.state.shouldHeartHightlight || this.state.memo.favoritedAt );
      } else {
        return false;
      }
    },
    labelId() {
      if (this.state.label) {
        const labelObj = {labelId: this.state.label._id};
        return labelObj;
      } else {
        return false;
      }
    }
  },

  events: {
    'click .more-detail'() {
      Session.set('isSearching', false);
      resetModalForm();
    },
    'click .detail-chip'() {
      Session.set('isSearching', false);
      resetModalForm();
    },
    'click .fa-cog'() {
      Session.set('showMemoDetail', false);
      Session.set('showModal', true);
      Session.set('editMemoLabelId', this.state.memo._id);
      Session.set('formType', 'EditMemoLabel');
    },
    'mouseover .heart'() {
      this.state.shouldHeartHightlight = true;
    },
    'mouseout .heart'() {
      this.state.shouldHeartHightlight = false;
    },
    'click .heart'() {
      Meteor.call('toggleFavorite', this.state.memo._id);
    },
    'click .archive-memo'() {
      if (this.state.memo.status === "active") {
        Meteor.call('archiveMemo', this.state.memo);
      } else {
        Meteor.call('memoUrlClicked', this.state.memo);
      }
    },
    'click .card-image-url'() {
      Meteor.call('memoUrlClicked', this.state.memo);
      window.open(this.state.memo.url, '_blank');
      return false;
    },
    'submit #add-comment'(event) {
      event.preventDefault();
      const comment = event.target.comment.value;
      Meteor.call('addComment', comment, this.state.memo._id);
      event.target.comment.value = "";
    }
  },
});

TemplateController('CommentItem', {
  helpers: {
    username() {
      const user = Meteor.users.findOne({_id: this.data.userId});
      return user.username;
    },
    date() {
      return moment(this.data.commentedAt).fromNow();
    }
  }
});
