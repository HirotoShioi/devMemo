import { Accounts } from 'meteor/accounts-base';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

AccountsTemplates.addFields([
	{
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
]);