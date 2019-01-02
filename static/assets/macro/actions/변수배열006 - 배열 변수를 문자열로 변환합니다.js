module.exports = {
	cid: '{3fb2bfd8-8d68-47e0-b021-2e2dc837924e}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수를 문자열로 변환합니다',
	description: '{{스코프_일반}}변수 {{변수명}}에 {{스코프_배열}} 배열 변수 {{배열변수명}}의 모든 요소를 연결해 하나의 문자열로 담습니다. <br>배열의 각 요소를 구분할 문자열은 {{구분자}}입니다.',
	variables: {
		'스코프_일반': {
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
			text: '병합된문자열',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'스코프_배열': {
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
		'구분자': {
			text: ', ',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let targetArray;
		switch (this.스코프_배열) {
			case 'LOCAL':
				targetArray = this.session[this.배열변수명];
				break;
			case 'GLOBAL':
				targetArray = Eri.variable[this.배열변수명]
				break;
			case 'CLOSURE':
				if (this.배열변수명 in this.session) targetArray = this.session[this.배열변수명];
				else if (this.배열변수명 in Eri.variable) targetArray = Eri.variable[this.배열변수명];
				break;
		}
		switch (this.스코프_일반) {
			case 'LOCAL':
				this.session[this.변수명] = targetArray.join(this.구분자);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = targetArray.join(this.구분자);
				break;
		}
		next();
	}
};