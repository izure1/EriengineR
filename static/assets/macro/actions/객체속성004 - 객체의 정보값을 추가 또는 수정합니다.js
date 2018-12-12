module.exports = {
	cid: '{450EC42E-FCBF-4F25-B51C-1C01286C5585}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 정보값을 추가 또는 수정합니다',
	description: '객체 {{객체명}}에 {{정보명}}(이)란 정보값을 추가 또는 수정합니다. 값은 {{정보값}}입니다. <br>객체에 추가적으로 필요하다고 생각되는 정보를 추가할 때 사용하면 좋습니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name',
			skip: true
		},
		'정보명': {
			text: '호감도',
			type: 'value',
			sample: 'data_name'
		},
		'정보값': {
			text: 'undefined',
			type: 'value'
		}
	},
	fn: function (next, stop, e) {
		const dataObj = {};
		dataObj[this.정보명] = this.정보값;
		lve(this.객체명).data(dataObj);
		next();
	}
};