module.exports = {
	cid: '{AF42EB60-D7A5-4C8E-9085-FC91A911B616}',
	version: '1.0.0',
	class: '화면/효과',
	title: '화면에 필터 효과를 줍니다',
	description: '화면에 {{효과명}} 필터 효과를 {{시간}}초에 걸쳐 {{백분율}}% 만큼 줍니다.',
	variables: {
		'효과명': {
			text: '기본값',
			type: 'radio',
			sample: [{
					text: '기본값',
					value: 'none'
				},
				{
					text: '번지기',
					value: 'blur'
				},
				{
					text: '흑백으로',
					value: 'grayscale'
				},
				{
					text: '누렇게',
					value: 'sepia'
				},
				{
					text: '고대비',
					value: 'contrast'
				},
				{
					text: '색 반전',
					value: 'invert'
				},
				{
					text: '열 감지',
					value: 'saturate'
				}
			],
			skip: true
		},
		'시간': {
			text: 1,
			type: 'value',
			skip: true
		},
		'백분율': {
			text: '100',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {

		const getFilter = function () {
			const filter = {};
			this.style.filter.split(' ').forEach(item => {
				if (item === '') return;
				else {
					const query = item.split('(');
					const name = query[0];
					const value = parseFloat(query[1]);
					filter[name] = value;
				}
			});
			return filter;
		};

		const createFilter = function (filter) {
			let query = '';
			for (const prop in filter) {
				query += `${prop}(${filter[prop]}`;
				if (prop === 'blur') query += 'px';
				else query += '%';
				query += ') ';
			}
			return query;
		};

		const setFilter = function (filter) {
			this.style.filter = createFilter(filter);
		};



		const canvas = document.querySelector(Eri.game.canvas);
		const filter = getFilter.call(canvas);

		const current = filter[this.효과명] || 0;
		const goal = this.백분율;
		const duration = this.시간 * 1000;

		let currentFilter;

		if (this.효과명 === 'none') {
			currentFilter = getFilter.call(canvas);
			for (const key in currentFilter) {
				currentFilter[key] = 0;
			}
			setFilter.call(canvas, currentFilter);
		} else {
			Eri.util.animate(current, goal, duration, step => {
				currentFilter = getFilter.call(canvas);
				currentFilter[this.효과명] = step;
				setFilter.call(canvas, currentFilter);
			});
		}

		currentFilter = getFilter.call(canvas);
		currentFilter[this.효과명] = goal;

		Eri.game.env.system.filter = createFilter(currentFilter);

		next();
	}
};