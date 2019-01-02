module.exports = {
	cid: '{4f55cc05-087e-44f7-a13d-a7edd1d9852e}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수에 요소를 넣습니다',
	description: '{{스코프}} 배열 변수 {{배열변수명}}의 {{삽입방향}}쪽에 {{값}}을 넣습니다.',
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
			text: '목록',
			type: 'text',
			sample: 'variable_name'
		},
		'삽입방향': {
			text: '뒤',
			type: 'radio',
			sample: [{
					text: '앞',
					value: 'UNSHIFT'
				},
				{
					text: '뒤',
					value: 'PUSH'
				}
			],
			skip: true
		},
		'값': {
			text: '값',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프) {
			case 'LOCAL':
				targetVariable = this.session[this.배열변수명];
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable[this.배열변수명];
				break;
			case 'CLOSURE':
				if (this.배열변수명 in this.session) targetVariable = this.session[this.배열변수명];
				else if (this.배열변수명 in Eri.variable) targetVariable = Eri.variable[this.배열변수명];
				break;
		}
		switch (this.삽입방향) {
			case 'UNSHIFT':
				targetVariable.unshift(this.값);
				break;
			case 'PUSH':
				targetVariable.push(this.값);
				break;
			default:
				stop();
				break;
		}
		next();
	}
};