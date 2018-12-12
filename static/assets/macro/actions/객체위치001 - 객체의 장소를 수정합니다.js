module.exports = {
	cid: '{2CE546A3-4B3F-4D4D-A10D-E9275BB9677E}',
	version: '1.0.0',
	class: '객체/위치',
	title: '객체의 장소를 수정합니다',
	description: '객체 {{객체명}}(를)을 {{장소명}}(으)로 이동합니다.',
	variables: {
		'객체명': {
			text: '카메라',
			type: 'value',
			sample: 'character_name'
		},
		'장소명': {
			text: '(플레이)::집',
			type: 'value',
			sample: 'scene_name_play'
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).attr({ scene: this.장소명 });
		next();
	}
};