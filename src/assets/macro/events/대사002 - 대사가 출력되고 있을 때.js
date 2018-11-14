module.exports = {
	cid: '{7701c807-4e9a-4cfd-bf4c-41f79634e884}',
	version: '1.0.0',
	class: '대사',
	title: '대사가 출력되고 있을 때',
	description: '대사가 출력되고 있을 때 작동합니다. <br>예를 들어 대사가 타이핑될 때 마다 효과음을 주고 싶을 때 유용합니다.',
	fn: function (start) {
		Eri.process.on('dialogprinting', start);
	}
};