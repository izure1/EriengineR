module.exports = {
	cid: '{64ECAFBB-656F-4AAC-86AE-5EC7CF898933}',
	version: '1.0.0',
	class: '대사',
	title: '문자열 객체를 대사창으로 만듭니다',
	description: '문자열 객체 {{객체명}}(를)을 대사창으로 만듭니다. <br>앞으로 이 문자열 객체가 대사 및 독백을 출력할 것입니다.',
	variables: {
		'객체명': {
			text: '대사창',
			type: 'value',
			sample: 'character_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		Eri.game.env.system.dialog.text = this.객체명;
		next();
	}
};