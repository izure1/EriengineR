module.exports = {
	cid: '{3B7EBF05-A181-4EC0-83EB-82B6835DD4C1}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체에 카테고리(범주)를 추가 또는 제거합니다',
	description: '객체 {{객체명}}에 {{카테고리명}}(이)라는 카테고리<small>(범주)</small>명을 {{작업}}합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name',
			skip: true
		},
		'카테고리명': {
			text: '캐릭터',
			type: 'text',
			sample: 'class_name',
			skip: true
		},
		'작업': {
			text: '추가',
			type: 'radio',
			sample: [
				{ text: '추가', value: 1 },
				{ text: '제거', value: 2 },
				{ text: '반전', value: 3 }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.작업) {
			case 1: {
				lve(this.객체명).addClass(this.카테고리명);
				break;
			}
			case 2: {
				lve(this.객체명).removeClass(this.카테고리명);
				break;
			}
			case 3: {
				lve(this.객체명).toggleClass(this.카테고리명);
				break;
			}
		}
		next();
	}
};