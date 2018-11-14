module.exports = {
	cid: '{017B0F8A-65E2-49F7-827B-06E17D6532D5}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/329',
	class: '키보드',
	title: '키보드 보조키를 사용 여부를 확인합니다',
	description: '위 사건의 키보드를 눌렀을 때, {{보조키}}키를 함께 사용했다면 작동합니다.',
	variables: {
		'보조키': {
			text: 'shift',
			type: 'radio',
			sample: [
				{ text: 'shift', value: 'shift' },
				{ text: 'ctrl', value: 'ctrl' },
				{ text: 'alt', value: 'alt' }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'KeyboardEvent') {
			stop();
			return;
		}
		switch (this.보조키) {
			case 'shift': {
				if (e.value.shiftKey) next();
				else stop();
				break;
			}
			case 'ctrl': {
				if (e.value.ctrlKey) next();
				else stop();
				break;
			}
			case 'alt': {
				if (e.value.altKey) next();
				else stop();
				break;
			}
		}
	}
};