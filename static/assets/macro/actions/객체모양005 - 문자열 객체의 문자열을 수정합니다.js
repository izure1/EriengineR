module.exports = {
	cid: '{D8AE4C44-218A-46ED-8B05-34E3958256F4}',
	version: '1.0.0',
	class: '객체/모양',
	title: '문자열 객체의 문자열을 수정합니다',
	description: '객체 {{객체명}}의 문자열을 {{문자열}}(으)로 수정합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'문자열': {
			text: '문자열 내용',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).attr({ text: this.문자열 });
		next();
	}
};