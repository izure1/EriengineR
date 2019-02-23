module.exports = {
	cid: '{3a243087-f07b-41d4-a54d-7018980f0548}',
	version: '1.0.0',
	class: '객체',
	title: '객체를 우클릭했을 때',
	description: '객체를 우클릭했을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		lve.on('contextmenu', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};