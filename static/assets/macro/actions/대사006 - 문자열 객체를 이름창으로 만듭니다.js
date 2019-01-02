module.exports = {
	cid: '{08FC59E7-439B-40CB-A6F4-A94C5A7A80BB}',
	version: '1.0.0',
	class: '대사',
	title: '문자열 객체를 이름창으로 만듭니다',
	description: '문자열 객체 {{객체명}}(를)을 이름창으로 만듭니다. <br>앞으로 이 문자열 객체가 대사를 말하는 인물의 이름을 출력할 것입니다.',
	variables: {
		'객체명': {
			text: '이름창',
			type: 'text',
			sample: 'character_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		Eri.game.env.system.dialog.name = this.객체명;
		next();
	}
};