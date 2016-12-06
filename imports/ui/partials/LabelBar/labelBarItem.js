import { TemplateController } from 'meteor/space:template-controller';
import '../../../api/label.js';

import './labelBarItem.html';

TemplateController('labelBarItem',{
	state:{
	},
	events:{
		'click .search-item'(){
			const label = this.data.label;
			Session.set('labelBarShow',false);
			Session.set('Title',{name:label.name});
			Router.go('label.detail',{ labelId:label._id});
		}
	}
});