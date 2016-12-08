import { TemplateController } from 'meteor/space:template-controller';
import './Overlay.html';

TemplateController('Overlay',{
	helpers:{
		shouldOverlayShow(){
			if(Session.get('isShrinkedSideNavShown') || Session.get('isSearchNavShown') || Session.get('isSearching') || Session.get('labelBarShow')){
				Session.set('overlayShow',true);
				return true;
			}else{
				Session.set('overlayShow',false);
				return false;
			}
		},
	},
	events:{
		'click .overlay-show'(){
			Session.set('isShrinkedSideNavShown',false);
			Session.set('isSearchNavShown',false);
			Session.set('isSearching',false);
			Session.set('labelBarShow',false);
			Session.set('labelFormShow',false);
		},
	},
});