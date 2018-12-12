module.exports = {
	cid: '{2acdad7e-5cdf-4a49-bd20-383b19489602}',
	version: '1.0.0',
	class: '변수/배열',
	title: '구조체 변수의 속성에 요소를 할당합니다',
	description: '{{스코프}} 구조체 변수 {{구조체변수명}}의 {{속성명}} 속성에 {{값}}(를)을 할당합니다.',
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
		'구조체변수명': {
			text: '목록',
			type: 'value',
			sample: 'variable_name'
		},
		'속성명': {
			text: '속성명',
			type: 'value',
			sample: 'variable_object_key'
		},
		'값': {
			text: '값',
			type: 'value'
		}
	}, 
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프) {
			case 'LOCAL':
				targetVariable = this.session[this.구조체변수명];
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable[this.구조체변수명];
				break;
			case 'CLOSURE':
				if (this.구조체변수명 in this.session) targetVariable = this.session[this.구조체변수명];
				else if (this.구조체변수명 in Eri.variable) targetVariable = Eri.variable[this.구조체변수명];
				break;
		}
		targetVariable[this.속성명] = this.값;
		next();
	}
};