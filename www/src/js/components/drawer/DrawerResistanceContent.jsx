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
                                        <>
                                            <h2>Qualitative Data</h2>
                                            <p>
                                                <span>Susceptible</span>
                                                <span>
                                                    {Math.round((1 - value.value) * 100)}%{' '}
                                                    {value.susceptible !== undefined &&
                                                        <>(N={value.susceptible})</>
                                                    }
                                                </span>
                                            </p>
                                            <p>
                                                <span>95% Confidence Interval</span>
                                                <span>
                                                    {Math.round((1 - value.confidenceInterval[0]) * 100)}–
                                                    {Math.round((1 - value.confidenceInterval[1]) * 100)}%
                                                </span>
                                            </p>
                                            {value.intermediate !== undefined &&
                                                <p>
                                                    <span>Proportion Intermediate</span>
                                                    <span>
                                                        {Math.round(value.intermediate / value.sampleSize * 100)}%{' '}
                                                        (N={value.intermediate})
                                                    </span>
                                                </p>
                                            }
                                            {value.resistant !== undefined &&
                                                <p>
                                                    <span>Proportion Resistant</span>
                                                    <span>
                                                        {Math.round(value.resistant / value.sampleSize * 100)}%{' '}
                                                        (N={value.resistant})
                                                    </span>
                                                </p>
                                            }
                                            <p>
                                                <span>Number of Isolates (N)</span>
                                                <span>{value.sampleSize}</span>
                                            </p>
                                        </>
                                    }
                                    {value.type === resistanceTypes.mic &&
                                        <>
                                            <h2>Quantitative Data (Microdilution)</h2>
                                            <p>
                                                <span>Testing Method</span>
                                                <span>Microdilution</span>
                                            </p>
                                            {value.quantitativeData.percentileValue === undefined &&
                                                <p>⌛</p>
                                            }
                                            {value.quantitativeData.percentileValue !== undefined &&
                                                <p>
                                                    <span>MIC<sub>90</sub></span>
                                                    <span>{value.quantitativeData.percentileValue} mg/l</span>
                                                </p>
                                            }
                                            <p>
                                                <span>Number of Isolates (N)</span>
                                                <span>N={value.sampleSize}</span>
                                            </p>
                                        </>
                                    }
                                    {value.type === resistanceTypes.discDiffusion &&
                                        <>
                                            <h2>Quantitative Data (Disc Diffusion)</h2>
                                            <p>
                                                <span>Testing Method</span>
                                                <span>Disc Diffusion</span>
                                            </p>
                                            <p>
                                                <span>Number of Isolates (N)</span>
                                                <span>N={value.sampleSize}</span>
                                            </p>
                                        </>
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
