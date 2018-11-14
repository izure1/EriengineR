module.exports = {
	cid: '{5E8B3F1E-575E-49B3-894A-29EB70B43808}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/274',
	class: '마우스',
	title: '마우스를 좌클릭했을 때',
	description: '마우스를 좌클릭했을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('click', start);
	}
};