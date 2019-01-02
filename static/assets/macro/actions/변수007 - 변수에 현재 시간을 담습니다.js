module.exports = {
	cid: '{6860a690-5521-4dab-b2c8-910b19db4435}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 현재 시간을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 현재 {{시간종류}}(를)을 담습니다',
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
			text: '시간',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'시간종류': {
			text: '시각',
			type: 'radio',
			sample: [{
					text: '연도',
					value: 'YEAR'
				},
				{
					text: '월',
					value: 'MONTH'
				},
				{
					text: '일',
					value: 'DATE'
				},
				{
					text: '요일',
					value: 'DAY'
				},
				{
					text: '시각',
					value: 'HOURS'
				},
				{
					text: '분',
					value: 'MINUTES'
				},
				{
					text: '초',
					value: 'SECONDS'
				},
				{
					text: '초 소숫점 (.xxx)',
					value: 'MILLISECONDS'
				},
				{
					text: '타임스탬프',
					value: 'TIMESTAMP'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		const now = new Date();
		let value;
		switch (this.시간종류) {
			case 'YEAR':
				value = now.getFullYear();
				break;
			case 'MONTH':
				value = now.getMonth() + 1;
				break;
			case 'DATE':
				value = now.getDate();
				break;
			case 'DAY':
				value = now.getDay();
				break;
			case 'HOURS':
				value = now.getHours();
				break;
			case 'MINUTES':
				value = now.getMinutes();
				break;
			case 'SECONDS':
				value = now.getSeconds();
				break;
			case 'MILLISECONDS':
				value = now.getMilliseconds();
				break;
			case 'TIMESTAMP':
				value = ~~(now.getTime() / 1000);
				break;
			default:
				break;
		}
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		next();
	}
};