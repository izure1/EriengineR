module.exports = {
	cid: '{78F33567-318D-4FFF-8341-3211E9C650DB}',
	version: '1.0.0',
	class: '객체/모양',
	title: '이미지<small>(스프라이트 포함)</small> 객체의 이미지를 수정합니다',
	description: '이미지 객체 {{객체명}}의 이미지를 {{이미지파일}}(으)로 {{시간}}초에 걸쳐서 수정합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'이미지파일': {
			text: 'undefined',
			type: 'file',
			sample: 'image'
		},
		'시간': {
			text: '1',
			type: 'value',
			skip: true
		}
	},
	fn: async function (next, stop, e) {
		let afterimage, originimage;

		const imageUrl = Eri.process.fileManager.get(this.이미지파일);

		const timer = this.시간 * 1000;
		const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
			let r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});

		originimage = lve(this.객체명).get(0);

		// 해당 객체가 존재하지 않을 경우 이 매크로를 무시합니다.
		if (!originimage) {
			next();
			return;
		}
		// 이미 똑같은 이미지일 경우 무시합니다.
		if (originimage.attr('src')[0] === imageUrl) {
			next();
			return;
		}

		async function createAfterImage() {
			return new Promise(resolve => {
				afterimage = lve(`afterImage_${uuid}`).from(originimage).ready(item => {
					lve.requestCaching(true);
					item.addClass('__system_onetime__');
					resolve();
				}).css({
					pointerEvents: 'none'
				});
			});
		}

		async function modifyOriginImage() {
			return new Promise(resolve => {
				originimage.attr({
					src: imageUrl
				}).css({
					opacity: 0
				}).ready(resolve);
			});
		}

		function fadeInOriginImage() {
			originimage.animate({
				opacity: (self) => {
					return self.data('__opacity')[0]
				}
			}, timer);
		}

		function fadeOutAfterImage() {
			afterimage.animate({
				opacity: 0
			}, timer).follow(originimage, {
				left: 0,
				bottom: 0,
				perspective: 0
			});
			Eri.setTimeout(() => {
				afterimage.remove()
			}, timer);
		}

		await createAfterImage();
		await modifyOriginImage();

		fadeInOriginImage();
		fadeOutAfterImage();

		next();
	}
};