module.exports = {
	cid: '{3c873391-1a3a-4bc5-954c-cee56588b387}',
	version: '1.0.0',
	class: '객체/모양',
	title: '문자열 객체의 글씨 기울기를 수정합니다',
	description: '객체 {{객체명}}의 글씨를 {{기울기여부}} 바꿉니다.',
	variables: {
		'객체명': {
			text: '대사창',
			type: 'text',
			sample: 'character_name',
			skip: true
		},
		'기울기여부': {
			text: '기울게',
			type: 'radio',
			sample: [{
					text: '기울게',
					value: 'italic'
				},
				{
					text: '기울지 않게',
					value: 'normal'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({
			fontStyle: this.기울기여부
		});
		next();
	}
};