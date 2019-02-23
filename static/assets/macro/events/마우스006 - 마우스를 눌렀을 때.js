module.exports = {
	cid: '{E16433AE-0FFA-40EB-943A-F263664327D7}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/277',
	class: '마우스',
	title: '마우스를 눌렀을 때',
	description: '마우스를 눌렀을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.eventManager.on('mousedown', start);
	}
};