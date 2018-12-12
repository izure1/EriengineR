module.exports = {
	cid: '{e8fef6d8-ebd5-44bb-a096-0826f3bfb8ea}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수의 요소를 제거합니다',
	description: '{{스코프}} 배열 변수 {{변수명}}의 {{오프셋}}번째 요소부터 {{갯수}}개 만큼의 요소를 제거합니다. <br>맨 첫 번째 요소는 0번째이며, 배열 변수가 존재하지 않을 경우 작동하지 않습니다.',
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
		'변수명': {
			text: '목록',
			type: 'value',
			sample: 'variable_name'
		},
		'오프셋': {
			text: '0',
			type: 'value'
		},
		'갯수': {
			text: '1',
			type: 'value',
			skip: true
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
		targetVariable.splice(this.오프셋, this.갯수);
		next();
	}
};