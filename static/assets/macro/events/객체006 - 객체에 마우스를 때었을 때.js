module.exports = {
	cid: '{7de65741-7797-4717-80ab-31d8a7361050}',
	version: '1.0.0',
	class: '객체',
	title: '객체에 마우스를 때었을 때',
	description: '객체에 마우스를 때었을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		lve.on('mouseup', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};