module.exports = {
	cid: '{8AF84FBA-3FD3-4BAA-96EA-8BE2BAAEAC09}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/314',
	class: '마우스',
	title: '마우스 버튼을 비교합니다',
	description: '위 사건의 마우스 버튼이 {{방향}}클릭일 경우 작동합니다.',
	variables: {
		'방향': {
			text: '좌',
			type: 'radio',
			sample: [
				{ text: '좌', value: 1 },
				{ text: '휠', value: 2 },
				{ text: '우', value: 3 }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// filter
		if (e.constructor !== 'MouseEvent') {
			stop();
			return;
		}
		if (e.value.which === this.방향) next();
		else stop();
	}
};