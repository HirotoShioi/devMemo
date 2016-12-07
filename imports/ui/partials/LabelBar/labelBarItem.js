import { TemplateController } from 'meteor/space:template-controller';
import { Label } from '../../../api/label.js';

import './labelBarItem.html';

TemplateController('labelBarItem',{
	state:{
		shouldOptionShow:false,
	},

	helpers:{
		shouldOptionShow(){
			return this.state.shouldOptionShow;
		},
	},

	events:{
		'click .title'(){
			const label = this.data.label;
			Session.set('labelBarShow',false);
			Session.set('Title',{name:label.name});
			Router.go('label.detail',{ labelId:label._id});
		},
		'mouseover .search-item'(){
			this.state.shouldOptionShow = true;
		},
		'mouseout .search-item'(){
			this.state.shouldOptionShow = false;
		},
	},
});