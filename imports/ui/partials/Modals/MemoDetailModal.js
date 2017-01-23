import { TemplateController } from 'meteor/space:template-controller';
import { Memos } from '../../../api/memos.js';
import { Session } from 'meteor/session';
import { resetModalForm } from './modalHelper.js';
import { moment } from 'meteor/momentjs:moment';
import { i18n } from 'meteor/anti:i18n';
import { $ } from 'meteor/jquery';

import './MemoDetailModal.html';

TemplateController('MemoDetailModal', {
  state: {
    memo: {},
    label: {},
    favoritedAt: false,
    shouldCommentsShow: false,
  },
  helpers: {
    favorited() {
      return this.state.favoritedAt;
    },
    memo() {
      let memo = Memos.findOne({_id: Session.get('MemoDetailId')});
      this.state.memo = memo;
      if (memo) {
        this.state.label = memo.label();
        this.state.favoritedAt = memo.favoritedAt();
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
        if (this.state.memo.desc && this.state.memo.desc.length > 100) {
          this.state.memo.desc = `${this.state.memo.desc.substring(0, 100)}...`;
        }
        return this.state.memo.desc;
      } else {
        return false;
      }
    },
    shouldArchiveShow() {
      if (this.state.memo) {
        if (this.state.memo.status === "active" && !this.state.favoritedAt && this.state.memo.owner === Meteor.userId()) {
          return true;
        } else {
          return false;
        }
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
    'click .card-url'() {
      Meteor.call('memoUrlClicked', this.state.memo);
      window.open(this.state.memo.url, '_blank');
      return false;
    },
    'submit #add-comment'(event) {
      event.preventDefault();
      const comment = event.target.comment.value;
      Meteor.call('addComment', comment, this.state.memo._id);
      event.target.comment.value = "";
      this.state.shouldCommentsShow = true;
    },
    'click .fa-pencil'() {
      const comment = $("#add-comment input[name=comment]").val();
      Meteor.call('addComment', comment, this.state.memo._id);
      $('#add-comment').trigger("reset");
      this.state.shouldCommentsShow = true;
    },
    'click .comment-show-link'() {
      this.state.shouldCommentsShow = !this.state.shouldCommentsShow;
    }
  },
});

TemplateController('CommentItem', {
  state: {
    shouldDeleteCommentShow: false,
  },

  helpers: {
    username() {
      const user = Meteor.users.findOne({_id: this.data.userId});
      return user.username;
    },
    date() {
      return moment(this.data.commentedAt).fromNow();
    },
    isCommentOwner() {
      return (this.data.userId === Meteor.userId());
    }
  },

  events: {
    'mouseover .comment-item'() {
      if (this.data.userId === Meteor.userId()) {
        this.state.shouldDeleteCommentShow = true;
      }
    },
    'mouseout .comment-item'() {
      this.state.shouldDeleteCommentShow = false;
    },
    'click .delete-comment'() {
      Meteor.call('deleteComment', this.data._id);
    },
  }
});
