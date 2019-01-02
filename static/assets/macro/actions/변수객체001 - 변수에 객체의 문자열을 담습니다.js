module.exports = {
	cid: '{2b82dbe7-3431-4938-8217-fd6c6c17b7fa}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 문자열을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 문자열을 담습니다. <br>없다면 {{대체값}}(를)을 담습니다.',
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
			text: '문자열',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'text',
			sample: 'character_name'
		},
		'대체값': {
			text: 'null',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let value;
		let target;

		target = lve(this.객체명).get(0);

		if (!target){
			stop();
			return;
		}

		value = target.attr('text')[0];

		if (value === undefined) {
			value = null;
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