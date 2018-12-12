module.exports = {
	cid: '{ED9570B9-480C-4942-B3F8-38C7EC41701E}',
	version: '1.0.0',
	class: '객체/모양',
	title: '비디오 객체의 비디오를 수정합니다',
	description: '비디오 객체 {{객체명}}의 비디오를 {{비디오파일}}(으)로 수정합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'비디오파일': {
			text: 'undefined',
			type: 'file',
			sample: 'video'
		}
	},
	fn: function (next, stop, e) {
		const videoUrl = Eri.process.fileManager.get(this.비디오파일);
		const tarObj = lve(this.객체명);
		tarObj.load(videoUrl, next);
	}
};