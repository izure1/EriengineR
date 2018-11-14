module.exports = {
	cid: '{8c27c2c2-b6e8-422f-9252-e07f3663f944}',
	version: '1.0.0',
	class: '객체/관리',
	title: '객체를 복사합니다',
	description: '객체명 {{원본객체명}}(를)을 {{객체명}}(이)란 이름으로 복사해 만듭니다. <br>복사된 객체는 완전히 동일한 속성, 장소, 위치에 만들어집니다.',
	variables: {
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'원본객체명': {
			text: '원본객체명',
			type: 'value',
			sample: 'character_name'
		},
	},
	fn: function (next, stop, e) {
		lve(this.객체명).from(this.원본객체명);
		next();
	}
};