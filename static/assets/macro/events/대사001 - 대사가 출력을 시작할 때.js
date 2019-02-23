module.exports = {
	cid: '{a340df08-6f9e-4a71-9248-c05248683f7a}',
	version: '1.0.0',
	class: '대사',
	title: '대사가 출력을 시작할 때',
	description: '대사가 출력을 시작할 때 작동합니다.',
	variables: {},
	fn: function (start) {
		Eri.process.on('dialogprintstart', start);
	}
};