module.exports = {
	cid: '{35ffdcf4-09d3-421c-bf5c-757f9b8c1945}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 시간비율을 수정합니다',
	description: '객체 {{객체명}}의 시간비율을 {{속성값}}(으)로 수정합니다. <br>시간비율에 따라 객체의 이동 속도, 재생 속도가 결정됩니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'value',
			sample: 'character_name'
		},
		'속성값': {
			text: '1',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).attr({
			timescale: this.속성값
		});
		next();
	}
};