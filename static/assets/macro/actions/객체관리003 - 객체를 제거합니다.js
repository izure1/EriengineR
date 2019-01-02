module.exports = {
	cid: '{19547282-9A48-471A-AA5B-1344464CF375}',
	version: '1.0.0',
	class: '객체/관리',
	title: '객체를 제거합니다',
	description: '객체 {{객체명}}(를)을 제거합니다.',
	variables: {
		'객체명': {
			text: '객체명',
			type: 'text',
			sample: 'character_name'
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).remove();
		next();
	}
};