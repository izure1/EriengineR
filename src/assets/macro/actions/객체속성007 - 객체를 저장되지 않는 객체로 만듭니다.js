module.exports = {
	cid: '{1959881c-0b03-403f-ba55-4bcdb63233ed}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체를 저장되지 않는 객체로 만듭니다',
	description: '객체 {{객체명}}(를)을 <b>저장되지 않는</b> 객체로 만듭니다. <br>이후 게임을 저장할 때 함께 저장되지 않아, 게임을 불러올 경우 월드에 존재하지 않습니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		}
	},
	fn: function (next, stop, e) {
		lve(this['객체명']).addClass('__system_onetime__');
		next();
	}
};