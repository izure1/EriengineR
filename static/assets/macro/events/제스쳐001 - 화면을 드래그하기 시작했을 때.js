module.exports = {
	cid: '{4f527030-4211-4931-b69d-65e18b4d54f7}',
	version: '1.0.0',
	class: '제스쳐',
	title: '화면을 드래그하기 시작했을 때',
	description: '화면을 드래그하기 시작했을 때 작동합니다.',
	fn: function (start) {
		lve.on('dragstart', e => {
			const name = e.target === null ? null : e.target.name;
			const data = ScriptManager.getSavableData(e);
			const event = EventManager.createEvent(e.type, Object.assign({name: name}, data));
			start(event);
		});
	}
};