module.exports = {
	cid: '{626D7C20-9138-4762-8A21-03868FDCA518}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/278',
	class: '마우스',
	title: '마우스를 때었을 때',
	description: '마우스를 때었을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('mouseup', start);
	}
};