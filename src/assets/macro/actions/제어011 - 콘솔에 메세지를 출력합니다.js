module.exports = {
	cid: '{5b84ec2c-40e0-4ce4-bca8-c2539c9bf530}',
	version: '1.0.0',
	class: '제어',
	title: '콘솔에 메세지를 출력합니다',
	description: '콘솔창에 {{내용}}(를)을 출력합니다. <br>이 매크로는 게임에 어떤 영향도 미치지 않지만, 디버깅할 때 유용하게 사용할 수 있습니다.',
	variables: {
		'내용': {
			text: '테스트 문자열입니다.',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		console.log(this.내용);
		next();
	}
};