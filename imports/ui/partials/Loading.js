import { TemplateController } from 'meteor/space:template-controller';

import './Loading.html';
TemplateController('Loading',{
	helpers:{
		size(){
			console.log(this.data);
			return this.data.size;
		},
	},
});