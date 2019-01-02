module.exports = {
	cid: '{2d235d2c-1155-4c6e-9dea-6b3bb7264b2f}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수에 문자열을 잘라 넣습니다',
	description: '{{스코프}} 배열 변수 {{배열변수명}}에 문자열 {{문자열}}(를)을 {{값}}(를)을 기준으로 잘라 담습니다.',
	variables: {
		'스코프': {
			text: '지역 또는 전역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				},
				{
					text: '지역 또는 전역',
					value: 'CLOSURE'
				}
			],
			skip: true
		},
		'배열변수명': {
			text: '문자열_목록',
			type: 'text',
			sample: 'variable_name'
		},
		'문자열': {
			text: '새로운_문자열_목록',
			type: 'text'
		},
		'값': {
			text: '_',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const targetString = this.문자열 + '';
		const targetValue = this.값 + '';
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.배열변수명] = targetString.split(targetValue);
				break;
			case 'GLOBAL':
				Eri.variable[this.배열변수명] = targetString.split(targetValue);
				break;
			case 'CLOSURE':
				if (this.배열변수명 in this.session) this.session[this.배열변수명] = targetString.split(targetValue);
				else if (this.배열변수명 in Eri.variable) Eri.variable[this.배열변수명] = targetString.split(targetValue);
				break;
		}
		next();
	}
};