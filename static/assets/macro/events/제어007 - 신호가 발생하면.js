module.exports = {
	cid: '{7EA1204B-C4F1-4451-A0FB-AF3D8817DC35}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/289',
	class: '제어',
	title: '신호가 발생하면',
	description: '신호가 발생했을 때 작동합니다',
	variables: {},
	fn: function (start) {
		Eri.process.on('cue', start);
	}
};