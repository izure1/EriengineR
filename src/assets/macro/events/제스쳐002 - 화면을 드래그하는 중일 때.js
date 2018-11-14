module.exports = {
	cid: '{b4cdaf76-80bd-4a4a-a463-18bbcd074186}',
	version: '1.0.0',
	class: '제스쳐',
	title: '화면을 드래그하는 중일 때',
	description: '화면을 드래그하는 중일 때 작동합니다.',
	fn: function (start) {
		lve.on('drag', e => {
			const name = e.target === null ? null : e.target.name;
			const data = ScriptManager.getSavableData(e);
			const event = EventManager.createEvent(e.type, Object.assign({name: name}, data));
			start(event);
		});
	}
};