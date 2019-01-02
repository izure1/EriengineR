module.exports = {
	cid: '{36376557-0471-4c0b-8095-30a4d87bed6a}',
	version: '1.0.0',
	class: '변수/배열',
	title: '구조체 변수의 속성을 삭제합니다',
	description: '{{스코프}} 구조체 변수 {{구조체변수명}}의 {{속성명}} 속성을 삭제합니다. <br>해당 키에 할당된 요소도 함께 삭제됩니다.',
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
			type: 'text',
			sample: 'variable_name'
		},
		'속성명': {
			text: '속성명',
			type: 'text',
			sample: 'variable_object_key'
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
		delete targetVariable[this.속성명];
		next();
	}
};