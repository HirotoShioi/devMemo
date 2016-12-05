import { TemplateController } from 'meteor/space:template-controller';
import '../../../api/label.js';

import './labelSearchItem.html';

TemplateController('labelSearchItem',{
	state:{
	},
	events:{
		'click .search-item'(){
			const label = this.data.label;
			Session.set('isSearching',false);
			Session.set('Title',{name:label.name});
			Router.go('label.detail',{ labelId:label._id});
		}
	}
});