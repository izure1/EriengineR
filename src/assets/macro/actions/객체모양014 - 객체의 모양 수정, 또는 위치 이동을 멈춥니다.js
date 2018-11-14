module.exports = {
	cid: '{86AF235B-F806-4A49-B32B-914FB70129FE}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체의 모양 수정, 또는 위치 이동을 멈춥니다',
	description: '객체 {{객체명}}의 모양 수정, 또는 위치 이동을 멈춥니다. <br>객체의 모양과 위치의 변경은 이 행동이 작동한 시점에서 중단됩니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).stop();
		next();
	}
};