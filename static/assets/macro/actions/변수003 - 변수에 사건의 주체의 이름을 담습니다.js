module.exports = {
	cid: '{EF35F295-5F5D-4CF8-A0DC-0BA0EF381FA7}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 사건의 주체의 이름을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 위 사건의 주체의 이름을 담습니다. <br>예를 들어 객체 사건이라면 객체명이 담기고, 사운드 사건이라면 사운드명이 담깁니다.',
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
			text: '문자열_주체명',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const {
			name = null
		} = e.value;
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = name;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = name;
				break;
		}
		next();
	}
};