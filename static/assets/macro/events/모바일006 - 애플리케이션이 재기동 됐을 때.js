module.exports = {
	cid: '{b13506bf-8715-4c1b-97e2-e3b41d1f88ee}',
	version: '1.0.0',
	class: '모바일',
	title: '애플리케이션이 재기동 됐을 때',
	description: '멈췄던 애플리케이션이 재기동 됐을 때 작동합니다.',
	fn: function (start) {
		Eri.process.on('device_resume', start);
	}
};