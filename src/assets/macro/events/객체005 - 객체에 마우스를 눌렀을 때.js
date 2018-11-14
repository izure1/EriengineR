module.exports = {
	cid: '{9af29eb1-8a02-41f6-9506-bdb265c12ec2}',
	version: '1.0.0',
	class: '객체',
	title: '객체에 마우스를 눌렀을 때',
	description: '객체에 마우스를 눌렀을 작동합니다.',
	fn: function (start) {
		lve.on('mousedown', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};