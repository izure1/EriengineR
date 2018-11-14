module.exports = {
	cid: '{7BA9BAFD-A1E3-4BC4-BDF2-315AFA9E8251}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/323',
	class: '제어',
	title: '저장한 세이브 슬롯을 비교합니다',
	description: '위 사건의 저장한 세이브 슬롯이 {{슬롯번호}}번과 {{방식}}할 경우 작동합니다.',
	variables: {
		'슬롯번호': {
			text: '1',
			type: 'value'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: true },
				{ text: '불일치', value: false }
			]
		}
	},
	fn: function (next, stop, e) {
		if (this.슬롯번호 === e.value.which === this.방식) next();
		else stop();
	}
};