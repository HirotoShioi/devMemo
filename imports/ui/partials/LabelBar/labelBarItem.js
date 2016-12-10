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
			Router.go('label.detail',{ labelId:label._id});
		},
		'click .fa-trash'(){
			Session.set('showModal',true);
			Session.set('formType','DeleteLabel');
			Session.set('deleteLabelId', this.data.label._id);
		},
		'click .fa-pencil'(){
			Session.set('showModal',true);
			Session.set('formType','EditLabel');
			Session.set('editLabelId', this.data.label._id);
		},
		'click .label-bar-chip'(){
			const label = this.data.label;
			Session.set('labelBarShow',false);
			Router.go('label.detail',{ labelId:label._id});
			return false;
		},
		'mouseover .search-item'(){
			this.state.shouldOptionShow = true;
		},
		'mouseout .search-item'(){
			this.state.shouldOptionShow = false;
		},
	},
});