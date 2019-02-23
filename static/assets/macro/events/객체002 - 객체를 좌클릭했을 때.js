module.exports = {
	cid: '{FBD37F8D-867D-4697-AC4F-2CF1FAE3F873}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/267',
	class: '객체',
	title: '객체를 좌클릭했을 때',
	description: '객체를 좌클릭했을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		lve.on('click', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};