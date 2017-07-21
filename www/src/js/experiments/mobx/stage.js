import {observable, action} from 'mobx';

class Stage {

	@observable width;
	@observable height;

	@action updateSize(width, height) {
		console.log('Stage: Update to %o/%o', width, height);
		this.width = width;
		this.height = height;
	}

}

export default Stage;