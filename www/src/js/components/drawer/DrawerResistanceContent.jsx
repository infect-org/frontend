import React from 'react';
import marked from 'marked';
import { resistanceTypes } from '@infect/frontend-logic';
import { observer } from 'mobx-react';

export default @observer class DrawerResistanceContent extends React.Component {

    constructor(...props) {
        super(...props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer() {
        this.props.drawerViewModel.isOpen ?
            this.props.drawerViewModel.close() :
            this.props.drawerViewModel.open();
    }

    render() {
        return (
            <div className="drawer__inner">

                <div className="drawer__teaser" onClick={this.toggleDrawer}>
                    <div className="drawer__teaser-flap">
                        <div className="drawer__teaser-subtitle">Susceptibility</div>
                        <div className="drawer__teaser-title">
                            {this.props.resistance.bacterium.shortName} →{' '}
                            {this.props.resistance.antibiotic.name}
                        </div>
                    </div>
                </div>

                <div className="drawer__fixed">
                    <h1>
                        Susceptibility of {this.props.resistance.bacterium.shortName} to{' '}
                        {this.props.resistance.antibiotic.name}
                    </h1>
                </div>

                <div className="drawer__scrollable">
                    <div className="drawer__scrollable-inner">

                        <div className="drawer__body">

                            <p>Erklärung, wieso welche Daten angezeigt werden (Text für alle Empfindlichkeiten gleich; Englisch).</p>

                            {this.props.resistance.getValuesByPrecision().map(value => (
                                <div className="drawer__section" key={value.type}>
                                        {value.type === resistanceTypes.qualitative &&
                                            <h2>Qualitative Data</h2>
                                        }
                                        {value.type === resistanceTypes.mic &&
                                            <h2>MIC</h2>
                                        }
                                        {value.type === resistanceTypes.discDiffusion &&
                                            <h2>DD</h2>
                                        }
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
