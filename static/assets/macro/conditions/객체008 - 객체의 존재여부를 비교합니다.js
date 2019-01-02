module.exports = {
	cid: '{8BB6E225-0FCF-48E8-9710-0DFA42F76268}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/312',
	class: '객체',
	title: '객체의 존재여부를 비교합니다',
	description: '객체 {{객체명}}(이)가 게임 내에 {{방식}} 작동합니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'text',
			sample: 'character_name'
		},
		'방식': {
			text: '존재할 경우',
			type: 'radio',
			sample: [
				{ text: '존재할 경우', value: true },
				{ text: '존재하지 않을 경우', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const isExist = !!lve(this.객체명).get(0);
		if (isExist === this.방식) next();
		else stop();
	}
};