module.exports = {
	cid: '{0c3d754a-256e-4467-9af1-413e1b2152f8}',
	version: '1.0.0',
	class: '변수/대사',
	title: '변수에 대사의 정보를 담습니다',
	description: '{{스코프}} {{변수명}}에 지금으로부터 {{로그}}번 째 이전 대사의 {{정보}}(를)을 담습니다. <br>없다면 {{대체값}}(를)을 담습니다.',
	variables: {
		'스코프': {
			text: '지역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				}
			],
			skip: true
		},
		'변수명': {
			text: '대사로그',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'로그': {
			text: '1',
			type: 'value',
		},
		'정보': {
			text: '내용',
			type: 'radio',
			sample: [{
					text: '이름',
					value: 'name'
				},
				{
					text: '내용',
					value: 'text'
				},
				{
					text: '음성파일명',
					value: 'audio'
				}
			],
			skip: true
		},
		'대체값': {
			text: 'null',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const logs = Eri.system.dialog.log;
		const log = logs[logs.length - this.로그] || {
			name: this.대체값,
			text: this.대체값,
			audio: this.대체값
		};
		const information = log[this.정보];
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = information;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = information;
				break;
		}
		next();
	}
};