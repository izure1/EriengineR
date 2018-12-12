module.exports = {
	cid: '{FD789745-16EC-4A7A-80D1-A0016CA873AA}',
	version: '1.0.0',
	class: '화면/효과',
	title: '시스템 화면을 닫습니다',
	description: '{{시간}}초에 걸쳐 시스템 화면을 닫고, 다시 주인공의 시점으로 돌아갑니다.',
	variables: {
		'시간': {
			text: '0.5',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const currentCamera = lve('[using_camera]').get(0);
		if (Eri.game.env.system.camera === null) {
			next();
			return;
		}
		if (Eri.game.env.system.camera === currentCamera.name) {
			next();
			return;
		}
		lve(Eri.game.env.system.camera).use(this.시간 * 1000);
		next();
	}
};