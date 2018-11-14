module.exports = {
	cid: '{B93AA899-AE11-4CFD-8A16-A22D18329A22}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/273',
	class: '마우스',
	title: '마우스를 움직였을 때',
	description: '마우스를 움직였을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('mousemove', start);
	}
};