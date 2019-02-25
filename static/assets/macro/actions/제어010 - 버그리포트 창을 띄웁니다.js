module.exports = {
	cid: '{25d61245-adad-4497-95a3-e50f02052d2e}',
	version: '1.0.0',
	class: '제어',
	title: '버그리포트 창을 띄웁니다',
	description: '버그리포트 창을 띄웁니다. <br>이는 플레이어가 당신에게 버그 신고를 할 수 있도록 돕습니다.',
	variables: {},
	fn: function (next, stop, e) {
		Eri.process.scriptManager.constructor.showSubmitDialog();
		next();
	}
};