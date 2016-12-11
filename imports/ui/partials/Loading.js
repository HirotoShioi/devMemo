import { TemplateController } from 'meteor/space:template-controller';

import './Loading.html';
TemplateController('Loading',{
	helpers:{
		size(){
			return this.data.size;
		},
	},
});