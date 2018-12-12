module.exports = {
	cid: '{40c934b6-8151-4959-a4c6-cfd32c4986ce}',
	version: '1.0.0',
	class: '객체/모양',
	title: '문자열 객체의 글씨 굵기를 수정합니다',
	description: '객체 {{객체명}}의 글씨를 {{굵기여부}} 바꿉니다.',
	variables: {
		'객체명': {
			text: '대사창',
			type: 'value',
			sample: 'character_name',
			skip: true
		},
		'굵기여부': {
			text: '굵게',
			type: 'radio',
			sample: [{
					text: '굴게',
					value: 'bold'
				},
				{
					text: '굵지 않게',
					value: 'normal'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({
			fontWeight: this.굵기여부
		});
		next();
	}
};