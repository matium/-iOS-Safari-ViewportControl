import * as $ from 'jquery';
import DeviceTypes from './DeviceTypes';
import * as viewportUnitsBuggyfill from 'viewport-units-buggyfill';
import '../scss/index.scss';

export class Main {
	// リサイズイベントを制限するために設置するタイマー
	protected resize_timer: any;

	constructor() {
		this.init();
	}

	/**
	 * 初期設定
	 */
	public init():void {
		// 一度リサイズ処理を発生させて、現在のデバイスを教える
		this.resize();
		// スマホの時はリサイズイベントにviewport調整を初期化
		let smpResize: boolean = false;
		if (DeviceTypes.currentType == DeviceTypes.DEVICE_SMP) {
			viewportUnitsBuggyfill.init();
			smpResize = true;
		}
		// リサイズイベントをセット（Windowリサイズ中0.1秒おき）
		$(window).resize(() => {
			if (this.resize_timer !== false) {
				clearTimeout(this.resize_timer);
			}
			this.resize_timer = setTimeout(() => {
				if (smpResize) {
					viewportUnitsBuggyfill.refresh();
				}
				// リサイズを実行
				this.resize();
			}, 100);
		});
	}

	/**
	 * リサイズ時のリスナーメソッド
	 */
	public resize():void {
		// Window幅から現在のデバイスを判断
		let winWidth: number = window.innerWidth;
		if (winWidth > DeviceTypes.XLARGE_WIDTH) {
			// 大型ディスプレイ
			DeviceTypes.currentType = DeviceTypes.DEVICE_XLARGE;
		}
		else if (winWidth > DeviceTypes.DESKTOP_WIDTH) {
			// デスクトップ／ラップトップ
			DeviceTypes.currentType = DeviceTypes.DEVICE_DESKTOP;
		}
		else if (winWidth > DeviceTypes.TABLET_WIDTH) {
			// タブレット端末
			DeviceTypes.currentType = DeviceTypes.DEVICE_TABLET;
		}
		else {
			// スマートフォン
			DeviceTypes.currentType = DeviceTypes.DEVICE_SMP;
		}
		console.log(DeviceTypes.currentType);
	}
}


let main: Main;
$(document).ready(()=>{
	main = new Main();
});
