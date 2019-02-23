module.exports = {
	cid: '{442E2BD7-5F31-488F-88B1-8917CAB0C9B4}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/269',
	class: '객체',
	title: '객체에 마우스를 치웠을 때',
	description: '객체에 마우스를 치웠을 때 작동합니다',
	variables: {},
	fn: function (start) {
		lve.on('mouseout', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};