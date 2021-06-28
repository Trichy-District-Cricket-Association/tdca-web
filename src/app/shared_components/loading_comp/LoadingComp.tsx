import './LoadingComp.scss';

const loadingScreen = `${process.env.PUBLIC_URL}/assets/images/loadingScreen.gif`;
const LoadingComp = () => (
    <div>
        <img src={loadingScreen} className="loadingScreen" />
    </div>
);

export default LoadingComp;
