import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend
} from "bizcharts";
import Selector from "./Selector"
import PropTypes from 'prop-types';

class ChartComp extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            data: [],
            status: "all"
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(val){
        this.setState({
            ...this.state,
            status: val,
            data: this.props.chart.data.filter((raw) => {
                if(val !== "all"){
                    return raw.type === val
                }
                return raw
            })
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
            data: nextProps.chart.data,
            fields: nextProps.chart.fields
        })
    }

    render() {
        // const ds = new DataSet()
        //
        // const dv = ds.createView().source(this.state.data)

        const cols = {
            date: {
                alias: 'date'
            },
            score: {
                alias: 'score'
            }
        };

        const title = {
            textStyle: {
                fontSize: '12',
                textAlign: 'center',
                fill: '#999',
                fontWeight: 'bold',
            }, // 坐标轴文本属性配置
        }
        return (
            <div>
                <Selector handleChange={this.handleChange} status={this.state.status}/>
                <Chart height={500} data={this.state.data} scale={cols} forceFit placeholder>
                    <Legend name="Team"/>
                    <Axis name="date" title={title}/>
                    <Axis name="score" title={title}/>
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="date*score"
                        size={2}
                        color={"name"}
                        shape={"smooth"}
                    />
                    <Geom
                        type="point"
                        position="date*score"
                        size={4}
                        shape={"circle"}
                        color={"name"}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
            </div>
        )
    }
}

ChartComp.propTypes = {
    chart: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.object),
        fields: PropTypes.array.isRequired
    }),
}

export default ChartComp