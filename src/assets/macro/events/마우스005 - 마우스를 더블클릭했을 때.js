module.exports = {
	cid: '{7E3885BB-1F5A-48FF-B449-C8D43EBCDF7A}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/276',
	class: '마우스',
	title: '마우스를 더블클릭했을 때',
	description: '마우스를 더블클릭했을 때 작동합니다.',
	fn: function (start) {
		Eri.process.eventManager.on('dblclick', start);
	}
};