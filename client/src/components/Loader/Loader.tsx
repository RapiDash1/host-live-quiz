import React from 'react';
import "./Loader.css";
import DefaultLoader from 'react-loader-spinner';

class Loader extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return(
            <div className="loader">
                <DefaultLoader
                    type="Watch"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    // timeout={3000} //3 secs
                />
            </div>
        );
    }
}

export default Loader;