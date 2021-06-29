import { observer } from 'mobx-react';
import React from 'react';

export default @observer class FilterList extends React.Component {

    getLogoURL() {
        const frontendConfig = this.props.tenantConfig.getConfig('frontend');
        return frontendConfig &&
            frontendConfig.userInterface &&
            frontendConfig.userInterface.logoUrl;
    }

    render() {
        return (
            <React.Fragment>
                {!this.getLogoURL() && null}
                {this.getLogoURL() &&
                    <img 
                        className="c-logo__vector-image"
                        src={this.getLogoURL()}
                    />
                }
            </React.Fragment>
        );
    }

}
