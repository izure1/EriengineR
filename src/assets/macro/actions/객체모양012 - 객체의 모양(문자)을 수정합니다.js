module.exports = {
	cid: '{4C8AC930-51E3-4E2C-8A24-6DD4E8A6FE68}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체의 모양<small>(문자)</small>을 수정합니다',
	description: '객체 {{객체명}}에 {{스타일명}}(이)란 모양을 수정합니다. 값은 {{스타일값}}입니다. <br>색상은 <b>해시태그</b>, <b>RGB</b>, <b>RGBA</b>값으로 지정 가능합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'스타일명': {
			text: '색상',
			type: 'radio',
			sample: [
				{
					text: '줄높이',
					value: 'lineHeight'
				},
				{
					text: '색상',
					value: 'color'
				},
				{
					text: '외각 색상',
					value: 'borderColor'
				},
				{
					text: '그림자 색상',
					value: 'shadowColor'
				}
			]
		},
		'스타일값': {
			text: 'red',
			type: 'value'
		}
	},
	fn: function (next, stop, e) {
		const styleObj = {};
		styleObj[this.스타일명] = this.스타일값;
		lve(this.객체명).css(styleObj);
		next();
	}
};