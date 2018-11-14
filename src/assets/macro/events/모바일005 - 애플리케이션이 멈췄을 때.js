module.exports = {
	cid: '{7c97373d-ba8a-45af-892d-7f80258c9e8c}',
	version: '1.0.0',
	class: '모바일',
	title: '애플리케이션이 멈췄을 때',
	description: '애플리케이션이 멈췄을 때 작동합니다. 전화가 왔거나, 홈으로 나갔을 경우가 해당됩니다.',
	fn: function (start) {
		Eri.process.on('device_pause', start);
	}
};