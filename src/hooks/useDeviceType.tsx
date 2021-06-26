import { useMediaQuery } from 'react-responsive';
import { Devices } from '../enums/devices';

const useDeviceType = (): Devices => {
    const isLargeScreen = useMediaQuery({ minWidth: 1200 });
    const isDesktop = useMediaQuery({
        minWidth: 800,
        maxWidth: 1200,
    });
    const isTablet = useMediaQuery({
        maxWidth: 800,
        minWidth: 400,
    });
    const isMobile = useMediaQuery({
        maxWidth: 600,
    });

    if (isLargeScreen) return Devices.largeScreen;
    if (isDesktop) return Devices.desktop;
    if (isTablet) return Devices.tablet;
    if (isMobile) return Devices.mobile;

    return Devices.desktop;
};

export default useDeviceType;
