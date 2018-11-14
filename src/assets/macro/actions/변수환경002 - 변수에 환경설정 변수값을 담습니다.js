module.exports = {
	cid: '{51971eb2-2c28-400c-829a-a74d17513340}',
	version: '1.0.0',
	class: '변수/환경',
	title: '변수에 환경설정 변수값을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 환경설정 변수 {{환경설정변수명}}의 값을 담습니다.',
	variables: {
		'스코프': {
			text: '지역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				}
			],
			skip: true
		},
		'변수명': {
			text: '환경설정값',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'환경설정변수명': {
			text: '배경음볼륨크기',
			type: 'value',
			sample: 'environment_variable_name'
		}
	},
	fn: function (next, stop, e) {
		const value = Eri.game.env.user[this.환경설정변수명];
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		next();
	}
};