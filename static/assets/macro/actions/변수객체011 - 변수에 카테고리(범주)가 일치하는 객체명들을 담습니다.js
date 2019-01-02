module.exports = {
	cid: '{94ae9840-029a-4dad-9f3b-a8630c585e3e}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 카테고리(범주)가 일치하는 객체명들을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 {{카테고리명}}(이)란 카테고리<small>(범주)</small>를 가지고 있는 객체명들을 배열로 담습니다. 이 변수는 배열 변수가 됩니다. <br>여러 카테고리가 일치하는 객체를 찾고 싶다면, 띄어쓰기로 구분하여 입력하세요.',
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
			text: '배열_객체명들',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'카테고리명': {
			text: '버튼',
			type: 'text',
			sample: 'class_name'
		}
	},
	fn: function (next, stop, e) {
		const classes = this.카테고리명.split(' ');
		let objects = lve('*');
		for (const category of classes) {
			objects = objects.findClass(category);
		}
		objects = objects.context.map((item) => {
			return item.name;
		});
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = objects;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = objects;
				break;
		}
		next();
	}
};