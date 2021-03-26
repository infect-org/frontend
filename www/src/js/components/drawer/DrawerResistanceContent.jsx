import React from 'react';
import marked from 'marked';
import { resistanceTypes } from '@infect/frontend-logic';
import { observer } from 'mobx-react';
import Histogram from './Histogram.jsx';

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

                            <div className="drawer__header">
                                <p>Erklärung, wieso welche Daten angezeigt werden (Text für alle Empfindlichkeiten gleich; Englisch).</p>
                            </div>

                            {this.props.resistance.getValuesByPrecision().map(value => (
                                // <div className="drawer__section" key={value.type.identifier}>
                                <div className={`drawer__section drawer__section--${value.type.identifier}`} key={value.type.identifier}>
                                    <div className="drawer__section-inner">

                                        {value.type === resistanceTypes.qualitative &&
                                            <>
                                                <h2>Qualitative Data</h2>
                                                <table className="drawer__values">
                                                    <tr className="drawer__value drawer__value--bold">
                                                        <td className="drawer__value-label">Susceptible</td>
                                                        <td className="drawer__value-value">
                                                            {Math.round((1 - value.value) * 100)}%{' '}
                                                            {value.susceptible !== undefined &&
                                                            <>(N={value.susceptible})</>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr className="drawer__value">
                                                        <td className="drawer__value-label">95% Confidence Interval</td>
                                                        <td className="drawer__value-value">
                                                            {Math.round((1 - value.confidenceInterval[1]) * 100)}–
                                                            {Math.round((1 - value.confidenceInterval[0]) * 100)}%
                                                        </td>
                                                    </tr>
                                                    {value.intermediate !== undefined &&
                                                        <tr className="drawer__value">
                                                            <td className="drawer__value-label">Proportion Intermediate</td>
                                                            <td className="drawer__value-value">
                                                                {Math.round(value.intermediate / value.sampleSize * 100)}%{' '}
                                                                (N={value.intermediate})
                                                            </td>
                                                        </tr>
                                                    }
                                                    {value.resistant !== undefined &&
                                                        <tr className="drawer__value">
                                                            <td className="drawer__value-label">Proportion Resistant</td>
                                                            <td className="drawer__value-value">
                                                                {Math.round(value.resistant / value.sampleSize * 100)}%{' '}
                                                                (N={value.resistant})
                                                            </td>
                                                        </tr>
                                                    }
                                                    <tr className="drawer__value drawer__value--bold">
                                                        <td className="drawer__value-label">Number of Isolates (N)</td>
                                                        <td className="drawer__value-value">{value.sampleSize}</td>
                                                    </tr>
                                                </table>
                                            </>
                                        }

                                        {value.type === resistanceTypes.mic &&
                                            <>
                                                <h2>Quantitative Data (Microdilution)</h2>
                                                <table className="drawer__values">
                                                    <tr className="drawer__value drawer__value--bold">
                                                        <td className="drawer__value-label">Testing Method</td>
                                                        <td className="drawer__value-value">Microdilution</td>
                                                    </tr>
                                                    {value.quantitativeData.percentileValue === undefined &&
                                                        <tr className="drawer__value">
                                                            <td className="drawer__value-label">MIC<sub>90</sub></td>
                                                            <td className="drawer__value-value">⌛</td>
                                                        </tr>
                                                    }
                                                    {value.quantitativeData.percentileValue !== undefined &&
                                                        <tr className="drawer__value">
                                                            <td className="drawer__value-label">MIC<sub>90</sub></td>
                                                            <td className="drawer__value-value">{value.quantitativeData.percentileValue} mg/l</td>
                                                        </tr>
                                                    }
                                                    <tr className="drawer__value">
                                                        <td className="drawer__value-label">Number of Isolates (N)</td>
                                                        <td className="drawer__value-value">N={value.sampleSize}</td>
                                                    </tr>
                                                </table>
                                                {value.quantitativeData.percentileValue === undefined &&
                                                    <p>⌛</p>
                                                }
                                                {value.quantitativeData.percentileValue !== undefined &&
                                                    <Histogram
                                                        data={value.quantitativeData.slots.slots}
                                                        xAxisLabel="MIC (mg/l)"
                                                        mic90={value.quantitativeData.percentileValue}
                                                    />
                                                }
                                            </>
                                        }

                                        {value.type === resistanceTypes.discDiffusion &&
                                            <>
                                                <h2>Quantitative Data (Disc Diffusion)</h2>

                                                <table className="drawer__values">
                                                    <tr className="drawer__value drawer__value--bold">
                                                        <td className="drawer__value-label">Testing Method</td>
                                                        <td className="drawer__value-value">Disc Diffusion</td>
                                                    </tr>
                                                    <tr className="drawer__value">
                                                        <td className="drawer__value-label">Number of Isolates (N)</td>
                                                        <td className="drawer__value-value">N={value.sampleSize}</td>
                                                    </tr>
                                                </table>
                                                {value.quantitativeData.percentileValue === undefined &&
                                                    <p>⌛</p>
                                                }
                                                {value.quantitativeData.percentileValue !== undefined &&
                                                    <Histogram
                                                        data={value.quantitativeData.slots.slots}
                                                        xAxisLabel="DD (mm)"
                                                        scale="log"
                                                    />
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            ))}

                    </div>

                </div>

            </div>
        );
    }
}
