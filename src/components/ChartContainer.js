import React, {Component} from 'react'
import { csvParse } from 'd3-dsv'
import styled from 'styled-components';

import Chart from './Chart'
import DataEditor from './DataEditor'
import ErrorBoundary from './ErrorBoundary'
import AppBar from './AppBar'

const ChartWrapper = styled.div`
  padding: 40px 0;
`

const EditorWrapper = styled.div`
    padding: 0 20px;
`

class ChartContainer extends Component{

    constructor(props){
        super(props)
        this.state = {
            source: "",
            chart: {
                data: [],
                fields: []
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(source){
        this.setState({
            source: source,
            chart: this.parseSourceData(source)
        })
    }

    parseSourceData(source){
        let fields = []
        let data = []

        csvParse(source).forEach(raw => {
            if(!fields.includes(raw['Visitor/Neutral'])){
                fields.push(raw['Visitor/Neutral']);
            }
            if(!fields.includes(raw['Home/Neutral'])){
                fields.push(raw['Home/Neutral']);
            }
            data.push({
                type: 'visit',
                name: raw['Visitor/Neutral'],
                score: parseInt(raw.PTSV, 10),
                date: raw.Date
            })
            data.push({
                type: 'home',
                name: raw['Home/Neutral'],
                score: parseInt(raw.PTSH, 10),
                date: raw.Date
            })
        })

        return {
            data: data,
            fields: fields
        };
    }

    render(){
        return (
            <div>
                <AppBar title="NBA Season Explorer"/>
                <ErrorBoundary>
                    <ChartWrapper>
                        <Chart chart={this.state.chart} />
                    </ChartWrapper>
                </ErrorBoundary>
                <EditorWrapper>
                    <DataEditor source={this.state.source} onDataChange={this.handleChange}/>
                </EditorWrapper>
            </div>
        )
    }
}

export default ChartContainer