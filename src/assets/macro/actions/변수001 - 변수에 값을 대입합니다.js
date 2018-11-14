module.exports = {
	cid: '{B03947E3-9AA3-451E-A0F3-2F35B9B3AC5E}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 값을 대입합니다',
	description: '{{스코프}}변수 {{변수명}}에 {{변수값}}(를)을 대입합니다. <br>배열 변수를 만들고 싶다면 변수값에 <b>new Array()</b>을 입력하세요. <br>구조체 변수는 <b>new Object()</b>을 입력하세요.',
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
			text: '임의의 변수',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'변수값': {
			text: 'undefined',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = this.변수값;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = this.변수값;
				break;
		}
		next();
	}
};