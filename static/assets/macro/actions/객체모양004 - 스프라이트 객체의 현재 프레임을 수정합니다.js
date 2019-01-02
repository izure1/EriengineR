module.exports = {
	cid: '{914ac469-a633-4680-aa83-7b7780fa4453}',
	version: '1.0.0',
	class: '객체/모양',
	title: '스프라이트 객체의 현재 프레임을 수정합니다',
	description: '객체 {{객체명}}(를)을 현재 프레임을 {{프레임}}(으)로 수정합니다. <br>맨 첫 프레임은 1입니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name'
		},
		'프레임': {
			text: '1',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).sprite({
			current: this.프레임 - 1
		});
		next();
	}
};