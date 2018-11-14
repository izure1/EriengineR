module.exports = {
	cid: '{766fa372-f88e-4f11-9ba8-d0d4ca1fe3bf}',
	version: '1.0.0',
	class: '화면/효과',
	title: '화면에 페이드 효과를 종료합니다',
	description: '현재 진행 중인 페이드 효과를 종료합니다.',
	variables: {},
	fn: function (next, stop, e) {
		// 기존 페이드 효과를 종료합니다
		if (Eri.system.screenEffect instanceof lve.effect.controller){
			Eri.system.screenEffect.end();
			Eri.util.clearSuppress('screenEffectDelay');
		}
		Eri.system.screenEffect = null;
		next();
	}
};