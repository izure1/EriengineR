module.exports = {
	cid: '{901783f3-2f35-488b-886b-41d4fc88fc17}',
	version: '1.0.0',
	class: '제스쳐',
	title: '화면의 드래그를 끝냈을 때',
	description: '화면의 드래그를 끝냈을 때 작동합니다.',
	fn: function (start) {
		lve.on('dragend', e => {
			const name = e.target === null ? null : e.target.name;
			const data = ScriptManager.getSavableData(e);
			const event = EventManager.createEvent(e.type, Object.assign({name: name}, data));
			start(event);
		});
	}
};