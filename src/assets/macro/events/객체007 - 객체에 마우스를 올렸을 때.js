module.exports = {
	cid: '{3048CD52-9796-4C5C-8B83-7BDDBEB2111D}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/268',
	class: '객체',
	title: '객체에 마우스를 올렸을 때',
	description: '객체에 마우스를 올렸을 때 작동합니다',
	fn: function (start) {
		lve.on('mouseover', e => {
			const target = ScriptManager.getSavableData(e.target);
			const event = EventManager.createEvent(e.type, target);
			start(event);
		});
	}
};