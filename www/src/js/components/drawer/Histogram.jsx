import React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

export default @observer class Histogram extends React.Component {

    height = 400;
    width = 400;

    // Sample sizes may be quite large
    yAxisLabelsWidth = 70;
    xAxisLabelsHeight = 60;
    gapBetweenBars = 10;

    fontSize = 14;
    tickWidth = 6;

    @computed get yAxisMax() {
        return this.props.data.reduce((prev, item) => (
            Math.max(prev, item.sampleCount)
        ), 0);
    }

    @computed get yScaleFactor() {
        // 0.95: Don't touch the sky
        const availableHeight = this.height * 0.95 - this.xAxisLabelsHeight;
        return availableHeight / this.yAxisMax;
    }

    @computed get xAxisMax() {
        return this.sortedSlots.slice().pop().value;
    }

    @computed get xAxisMin() {
        // Using 0 will cause issues (log2(0) is -Infinity.
        return this.sortedSlots.slice().shift().value;
    }

    @computed get xAxisWidth() {
        // 0.95: Make sure we don't touch the right end; especially with axis labels that are
        // centered
        return (this.width * 0.95) - this.yAxisLabelsWidth;
    }

    @computed get barWidth() {
        // Add 1 to data.length to make sure there's enough space to the right
        const width = Math.floor(this.xAxisWidth / (this.props.data.length + 1));
        return width;
    }

    @computed get sortedSlots() {
        return this.props.data.slice().sort((a, b) => (a.value - b.value));
    }

    getXPosition(value) {
        if (this.props.scale === 'log') {
            // 0 is not a good value, as log2(0) is Infinity; fake it.
            if (value === 0) return this.yAxisLabelsWidth;
            // Make sure xAxisMax and xAxisMin are not 0; log2 of 0 is Infinity (therefore we use
            // || 1 and || -1)
            const maxLogValue = Math.ceil(Math.log2(this.xAxisMax));
            // If scale is log, values might be below 0 (Math.log2(0.5)) is e.g. -1
            // If xAxisMin > 1, use 0 to not start xAxis above 0
            const minLogValue = Math.min(0, Math.floor(Math.log2(this.xAxisMin)));
            // If minLogValue === maxLogValue, we'll divide by 0
            const xScale = this.xAxisWidth / (maxLogValue - minLogValue);
            const result = this.yAxisLabelsWidth + (Math.log2(value) * xScale) - (minLogValue * xScale);
            return result;
        }
        return this.yAxisLabelsWidth + (value * (this.xAxisWidth / this.xAxisMax));
    }

    /**
     * On the x axis, basically add one tick per bar; as there's not enough space for that, reduce
     * them depending on the amount of bars.
     */
    @computed get getXAxisLabels() {
        // A label on every bar if we have <= 10 bars; on every second if we have <= 20 bars etc.
        const reducer = Math.max(1, Math.floor(this.props.data.length / 10) - 1);
        const labels = this.props.data
            .filter((value, index) => index % reducer === 0)
            .map(item => item.value);
        return labels;
    }

    /**
     * y axis still needs linear ticks distributed over the whole axis (and not a tick per bar)
     */
    getLinearTicks(maxValue) {
        // Division factor: By what do we have to divide value in order to get a one-digit number
        // (between 1 and 10)?
        const divisionFactor = 10 ** Math.floor(Math.log10(maxValue));
        const oneDigit = maxValue / divisionFactor;
        // Define tick size for the number between 0 and 10, then multiply back to orignal again
        const tickSizes = [0.1, 0.2, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1];
        const normalizedTickSize = tickSizes[Math.floor(oneDigit)];
        const tickSize = normalizedTickSize * divisionFactor;
        // + 1: To add 0 tick
        const amountOfTicks = Math.floor(maxValue / tickSize) + 1;
        return Array.from({ length: amountOfTicks })
            .map((item, index) => index * tickSize)
            // JS fucks up numbers as usual; make them readable
            .map((item) => {
                const numbersAfterPoint = item === 0 ? 0 : Math.max(0, Math.log10(item) * -1) + 2;
                return parseFloat(item.toFixed(numbersAfterPoint));
            });
    }

    @computed get getYAxisLabels() {
        const ticks = this.getLinearTicks(this.yAxisMax);
        return ticks;
    }

    render() {
        return (
            <div className="histogram">
                <svg className="histogram__chart" viewBox={`0 0 ${this.width} ${this.height}`}>

                    { /* y axis */ }
                    <g>
                        <line
                            x1={this.yAxisLabelsWidth}
                            y1={0}
                            x2={this.yAxisLabelsWidth}
                            y2={this.height - this.xAxisLabelsHeight}
                            className="histogram__axis"
                        />
                        {this.getYAxisLabels.map((label, index) => (
                            <g key={label}>
                                <text
                                    x={this.yAxisLabelsWidth - 10}
                                    y={this.height - this.xAxisLabelsHeight - (label * this.yScaleFactor) + (this.fontSize / 2)}
                                    className="histogram__axisLabel"
                                    textAnchor="end"
                                >
                                    {label}
                                </text>
                                <line
                                    x1={this.yAxisLabelsWidth - this.tickWidth}
                                    y1={this.height - this.xAxisLabelsHeight - (label * this.yScaleFactor)}
                                    x2={this.yAxisLabelsWidth}
                                    y2={this.height - this.xAxisLabelsHeight - (label * this.yScaleFactor)}
                                    className="histogram__axisTick"
                                />
                            </g>
                        ))}
                        <g
                            transform={`translate(${this.fontSize}, ${(this.height - this.xAxisLabelsHeight) / 2})`}
                        >
                            <text
                                className="histogram__axisLegend histogram__axisLegend-y"
                                textAnchor="middle"
                            >
                                Number of Isolates (N)
                            </text>
                        </g>
                    </g>

                    { /* x axis */ }
                    <g>
                        <line
                            x1={this.yAxisLabelsWidth}
                            y1={this.height - this.xAxisLabelsHeight}
                            x2={this.width}
                            y2={this.height - this.xAxisLabelsHeight}
                            className="histogram__axis"
                        />
                        {this.getXAxisLabels.map((label, index) => (
                            <g key={label}>
                                <g
                                    transform={`translate(${this.getXPosition(label) + 4} ${this.height - this.xAxisLabelsHeight + this.fontSize + this.tickWidth})`}
                                >
                                    <text
                                        className="histogram__axisLabel"
                                        textAnchor="end"
                                        transform="rotate(-60 0 -10)"
                                    >
                                        {label}
                                    </text>
                                </g>
                            </g>
                        ))}
                        <text
                            className="histogram__axisLegend"
                            textAnchor="middle"
                            y={this.height - this.fontSize / 2}
                            x={this.yAxisLabelsWidth + (this.width - this.yAxisLabelsWidth) / 2 + 8}
                        >
                            {this.props.xAxisLabel}
                        </text>
                    </g>

                    { /* Bars */ }
                    <g>
                        {this.sortedSlots.map((slot, index) => (
                            <rect
                                key={slot.value}
                                x={this.getXPosition(slot.value)}
                                width={this.barWidth}
                                y={this.height - this.xAxisLabelsHeight - slot.sampleCount * this.yScaleFactor}
                                height={slot.sampleCount * this.yScaleFactor}
                                className="histogram__bar"
                            />
                        ))}
                        { /* Mic90 */ }
                        {this.props.mic90 &&
                            <g>
                                <text
                                    className="histogram__mic90Text"
                                    x={this.getXPosition(this.props.mic90)}
                                    y={this.fontSize}
                                    textAnchor="middle"
                                >
                                    MIC90
                                </text>
                            </g>
                        }
                    </g>

                </svg>
            </div>
        );
    }

}
