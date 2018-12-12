module.exports = {
	cid: '{6618F716-1A9B-4741-AB65-CE7AA727495B}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/316',
	class: '마우스',
	title: '마우스 휠을 굴린 방향을 비교합니다',
	description: '위 사건의 마우스의 휠을 {{방향}}로 굴렸을 경우 작동합니다.',
	variables: {
		'방향': {
			text: '위',
			type: 'radio',
			sample: [
				{ text: '위', value: 1 },
				{ text: '아래', value: 2 }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'WheelEvent') {
			stop();
			return;
		}
		switch (this.방향) {
			case 1: {
				if (e.value.deltaY < 0) next();
				else stop();
				break;
			}
			case 2: {
				if (e.value.deltaY > 0) next();
				else stop();
				break;
			}
			default: {
				stop();
				break;
			}
		}
	}
};