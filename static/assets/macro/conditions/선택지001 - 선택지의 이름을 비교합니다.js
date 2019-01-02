module.exports = {
	cid: '{7736CF99-E17D-4FCC-AF9A-A04444A4600B}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/319',
	class: '선택지',
	title: '선택지의 이름을 비교합니다',
	description: '위 사건의 선택지 이름이 {{선택지이름}}(과)와 {{방식}}할 경우 작동합니다.',
	variables: {
		'선택지이름': {
			text: '1번 선택지',
			type: 'text',
			sample: 'select_name'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: true },
				{ text: '불일치', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'EriSelect') {
			stop();
			return;
		}
		if (e.value.name === this.선택지이름 === this.방식) next();
		else stop();
	}
};