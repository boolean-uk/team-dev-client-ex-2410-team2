import FullLogo from '../../assets/fullLogo-whiteLines';
import './loading.css';

const Loading = () => {
  return (
    <div className="bg-green loadingscreen">
      <div className="">
        <FullLogo whiteLines="true" maxWidth="577px" />
        <div className="loadingscreen-loader">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
