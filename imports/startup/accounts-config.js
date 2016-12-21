import { AccountsTemplates } from 'meteor/useraccounts:core';
import { i18n } from 'meteor/anti:i18n';

let pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
  },
  {
    _id: 'email',
    type: 'email',
    required: true,
    displayName: "email",
    re: /.+@(.+){2,}\.(.+){2,}/,
    errStr: 'Invalid email',
  },
  pwd,
]);
AccountsTemplates.addField({
  _id: "language",
  type: "select",
  displayName: function() {return i18n("settings.language.label");},
  select: [
    {
      text: "日本語",
      value: "ja",
    },
    {
      text: "English",
      value: "en",
    },
  ],
});
