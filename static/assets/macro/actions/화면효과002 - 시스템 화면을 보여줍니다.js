module.exports = {
	cid: '{E5672190-9093-47F7-BBA5-5E207DE59E19}',
	version: '1.0.0',
	class: '화면/효과',
	title: '시스템 화면을 보여줍니다',
	description: '{{시간}}초에 걸쳐 시스템 화면 {{시스템화면명}}(를)을 보여줍니다.',
	variables: {
		'시간': {
			text: '0.5',
			type: 'value',
			skip: true
		},
		'시스템화면명': {
			text: '(시스템)::환경설정 화면',
			type: 'value',
			sample: 'scene_name_system',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(`__system_camera_${this.시스템화면명}__`).use(this.시간 * 1000);
		next();
	}
};