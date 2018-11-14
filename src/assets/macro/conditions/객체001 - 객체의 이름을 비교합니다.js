module.exports = {
	cid: '{013DC16C-A2CD-4686-901F-D108C9CD7936}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/307',
	class: '객체',
	title: '객체의 이름을 비교합니다',
	description: '위 사건의 객체의 이름이 {{객체명}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'객체명': {
			text: '홍길동',
			type: 'value',
			sample: 'character_name'
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
		const target = lve(e.value.name).get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		if (e.value.name == this.객체명 == this.방식) next();
		else stop();
	}
};