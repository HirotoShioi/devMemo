import './SearchBarItem.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('SearchBarItem', {
	events:{
		'click .search-item'(){
			Meteor.call('memoUrlClicked', this.data);
			window.open(this.data.url);
			return false;
		}
	}
});
