module.exports = {
	cid: '{b20bda16-a2ed-4520-9bd1-fa38c2d7c23d}',
	version: '1.0.0',
	class: '변수/수학',
	title: '대각선 길이를 구합니다',
	description: '가로 {{x}}, 세로 {{y}}의 사각형의 대각선 길이를 구합니다. 이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다.',
	variables: {
		'x': {
			text: '1',
			type: 'value'
		},
		'y': {
			text: '1',
			type: 'value'
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
			text: '루트',
			type: 'value',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const powX = Math.pow(this.x, 2);
		const powY = Math.pow(this.y, 2);
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = Math.sqrt(powX + powY);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = Math.sqrt(powX + powY);
				break;
		}
		next();
	}
};