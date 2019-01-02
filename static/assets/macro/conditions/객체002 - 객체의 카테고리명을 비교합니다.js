module.exports = {
	cid: '{44C7D3E9-7654-450E-9551-0FD5D891C396}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/308',
	class: '객체',
	title: '객체의 카테고리명을 비교합니다',
	description: '객체 {{객체명}}(이)가 카테고리 {{카테고리명}}(를)을 {{방식}} 작동합니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'text',
			sample: 'character_name'
		},
		'카테고리명': {
			text: '홍길동',
			type: 'text',
			sample: 'class_name'
		},
		'방식': {
			text: '가지고 있을 경우',
			type: 'radio',
			sample: [{
					text: '가지고 있을 경우',
					value: true
				},
				{
					text: '가지고 있지 않을 경우',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const target = lve(this.객체명).get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		if (target.hasClass(this.카테고리명) === this.방식) next();
		else stop();
	}
};