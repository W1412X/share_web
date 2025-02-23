/**
 * A function to get the current device type
 * @returns mobile/desktop
 */
export function getDeviceType() {
    /**
     * get the device type
     */
    var deviceType="";
    if (window.innerWidth <= 600) {
      deviceType = 'mobile';
    } else {
      deviceType = 'desktop';
    }
    return deviceType
  }