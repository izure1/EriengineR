module.exports = {
	cid: '{0bad26a3-fec6-452e-99b6-fdeb160848f0}',
	version: '1.0.0',
	class: '변수/환경',
	title: '환경설정 변수에 값을 대입합니다',
	description: '환경설정 변수 {{변수명}}에 {{변수값}}(를)을 대입합니다. <br>환경설정 변수는 일반 변수와 달리 게임 저장의 영향을 받지 않습니다.',
	variables: {
		'변수명': {
			text: '배경음볼륨크기',
			type: 'value',
			sample: 'environment_variable_name'
		},
		'변수값': {
			text: '100',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		Eri.game.env.user[this.변수명] = this.변수값;
		next();
	}
};