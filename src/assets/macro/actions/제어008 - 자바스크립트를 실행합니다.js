module.exports = {
	cid: '{DA47528D-23A6-4611-9BE3-8C18AEF6BB27}',
	version: '1.0.0',
	class: '제어',
	title: '자바스크립트를 실행합니다',
	description: '{{자바스크립트}} <br>자바스크립트를 실행합니다. <br>변수는 {{ 변수명 }}(으)로 이용할 수 있습니다.',
	variables: {
		'자바스크립트': {
			text: '자바스크립트 내용',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		eval(`(function () { ${this.자바스크립트} })`)();
		next();
	}
};