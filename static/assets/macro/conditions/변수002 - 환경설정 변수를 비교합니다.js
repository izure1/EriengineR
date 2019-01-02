module.exports = {
	cid: '{bc292b53-215a-4d20-b71b-72da846ffa1e}',
	version: '1.0.0',
	class: '변수',
	title: '환경설정 변수를 비교합니다',
	description: '환경설정 변수 {{변수명}}의 값이 {{변수값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'변수명': {
			text: '대사출력속도',
			type: 'text',
			sample: 'environment_variable_name'
		},
		'변수값': {
			text: '변수값',
			type: 'text'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [{
					text: '일치',
					value: 1
				},
				{
					text: '불일치',
					value: 2
				},
				{
					text: '이하',
					value: 3
				},
				{
					text: '이상',
					value: 4
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let variable = Eri.game.env.user;
		switch (this.방식) {
			case 1:
				{
					if (variable[this.변수명] === this.변수값) next();
					else stop();
					break;
				}
			case 2:
				{
					if (variable[this.변수명] !== this.변수값) next();
					else stop();
					break;
				}
			case 3:
				{
					if (variable[this.변수명] <= this.변수값) next();
					else stop();
					break;
				}
			case 4:
				{
					if (variable[this.변수명] >= this.변수값) next();
					else stop();
					break;
				}
			default:
				{
					stop();
					break;
				}
		}
	}
};