module.exports = {
	cid: '{781E467A-A518-4136-BE3B-05356254BD95}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 카테고리<small>(범주)</small>명 소지여부를 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}(이)가 {{카테고리명}}(를)을 가지고 있는지 확인한 뒤, 있다면 {{true}}, 없다면 {{false}} (를)을 담습니다.',
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
			text: '객체 카테고리명 소지여부 변수',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'카테고리명': {
			text: '카테고리명',
			type: 'value',
			sample: 'class_name'
		},
		'true': {
			text: 'true',
			type: 'value',
			skip: true
		},
		'false': {
			text: 'false',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const value = lve(this.객체명).hasClass(this.카테고리명);
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value ? this.true : this.false;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value ? this.true : this.false;
				break;
		}
		next();
	}
};