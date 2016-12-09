import './PageTitle.html';
import { TemplateController } from 'meteor/space:template-controller';

TemplateController('PageTitle',{
	helpers:{
	},

	events:{
		'submit .memo-search-form'(event){
			event.preventDefault();
			let searchValue = event.target.search.value.trim();
			Session.set('searchQuery', searchValue);
			event.target.search.value = '';
			Router.go('memo.home');
		}
	}
});