module.exports = {
	cid: '{824e53ba-172e-4e65-868d-0c570d40506a}',
	version: '1.0.0',
	class: '변수/수학',
	title: '극좌표 공식을 이용해 좌표를 구합니다',
	description: '좌표 ｘ={{x}}, ｙ={{y}}에서 {{각도}}°로 {{r}}만큼 떨어져있는 곳의 {{좌표}}좌표를 구합니다. <br>이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다.',
	variables: {
		'x': {
			text: '0',
			type: 'value'
		},
		'y': {
			text: '0',
			type: 'value'
		},
		'각도': {
			text: '0',
			type: 'value'
		},
		'r': {
			text: '5',
			type: 'value'
		},
		'좌표': {
			text: 'ｘ',
			type: 'radio',
			sample: [{
					text: 'ｘ',
					value: 'x'
				},
				{
					text: 'ｙ',
					value: 'y'
				}
			]
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
			text: '극좌표값',
			type: 'value',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const radian = this.각도 * Math.PI / 180;
		const {
			x,
			y,
			r
		} = this;
		let value;
		switch (this.좌표) {
			case 'x':
				{
					value = r * Math.cos(radian) + x;
					break;
				}
			case 'y':
				{
					value = -(r * Math.sin(radian)) + y;
					break;
				}
		}
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