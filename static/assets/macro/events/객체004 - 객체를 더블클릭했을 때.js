module.exports = {
	cid: '{4838d342-0e5f-448e-95ca-dadb8970e1a2}',
	version: '1.0.0',
	class: '객체',
	title: '객체를 더블클릭했을 때',
	description: '객체를 더블클릭했을 때 작동합니다.',
	fn: function (start) {
		lve.on('dblclick', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};