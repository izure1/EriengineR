module.exports = {
	cid: '{4C5CE20C-09B0-4B9B-A118-6A23FC16764A}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/328',
	class: '키보드',
	title: '키보드 키값을 비교합니다',
	description: '위 사건의 키보드의 키값이 {{키값}}(과)와 {{방식}}(일)할 때 작동합니다. <br>키보드의 키값은 <a href=\'#\' style=\'color:#0075c8;\' onclick=\'Eri.fn.nw(\"./assets/html/keycodes/index.html\"); return false;\'>이곳</a>에서 확인할 수 있습니다.',
	variables: {
		'키값': {
			text: '13',
			type: 'text',
			skip: true
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{
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
		if (e.constructor !== 'KeyboardEvent') {
			stop();
			return;
		}
		switch (this.방식) {
			case 1: {
				if (e.value.keyCode === this.키값) next();
				else stop();
				break;
			}
			case 2: {
				if (e.value.keyCode !== this.키값) next();
				else stop();
				break;
			}
			case 3: {
				if (e.value.keyCode <= this.키값) next();
				else stop();
				break;
			}
			case 4: {
				if (e.value.keyCode >= this.키값) next();
				else stop();
				break;
			}
		}
	}
};