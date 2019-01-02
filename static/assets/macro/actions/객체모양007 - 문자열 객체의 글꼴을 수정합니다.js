module.exports = {
	cid: '{FA0BFBDE-A4EF-48B0-B2C0-0DBCAE227551}',
	version: '1.0.0',
	class: '객체/모양',
	title: '문자열 객체의 글꼴을 수정합니다',
	description: '객체 {{객체명}}의 글꼴을 {{글꼴이름}}(으)로 바꿉니다.',
	variables: {
		'객체명': {
			text: '대사창',
			type: 'text',
			sample: 'character_name',
			skip: true
		},
		'글꼴이름': {
			text: '돋움',
			type: 'text',
			sample: 'font_name'
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({
			fontFamily: this.글꼴이름
		});
		next();
	}
};