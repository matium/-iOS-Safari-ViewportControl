export default class DeviceTypes {
	/* Smart Phone Device */
	static readonly DEVICE_SMP: string = "smp";
	/* Tablet PC Device */
	static readonly DEVICE_TABLET: string = "tablet";
	/* Desktop and Laptop Device */
	static readonly DEVICE_DESKTOP: string = "desktop";
	/* XLARGE is Over2K Display Device */
	static readonly DEVICE_XLARGE: string = "xlarge";


	/* For Media-Query viewport width */
	static readonly SMP_WIDTH: number = 320;
	static readonly TABLET_WIDTH: number = 640;
	static readonly DESKTOP_WIDTH: number = 1024;
	static readonly XLARGE_WIDTH: number = 1600;

	static currentType: string = "smp";
}