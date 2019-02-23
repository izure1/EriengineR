module.exports = {
	cid: '{bf85d589-edbd-41b4-94be-c94041d1eff3}',
	version: '1.0.0',
	class: '객체',
	title: '객체 위에서 마우스를 움직였을 때',
	description: '객체 위에서 마우스를 움직였을 때 작동합니다.',
	variables: {},
	fn: function (start) {
		lve.on('mousemove', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};