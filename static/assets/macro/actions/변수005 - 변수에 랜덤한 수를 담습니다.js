module.exports = {
	cid: '{97759E81-7EDC-4EFA-BF99-B74B99661F2C}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 랜덤한 수를 담습니다',
	description: '{{시작수}}(과)와 {{끝수}} 사이 중에서 랜덤한 값을 {{스코프}}변수 {{변수명}}에 담습니다. <br>소숫점 이하의 값은 반올림됩니다.',
	variables: {
		'시작수': {
			text: '0',
			type: 'text',
			skip: true
		},
		'끝수': {
			text: '100',
			type: 'text',
			skip: true
		},
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
			text: '랜덤값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const value = Math.floor(Math.random() * (this.끝수 - this.시작수 + 1) + this.시작수);
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