import { ResponsivePie } from '@nivo/pie'
import { course } from '../../../data/DataPieCourse'
const PieChart = () => {

    return(
        <div style={{ height: "100%", width: "100%" }}>
        <h2>Rate of courses</h2>
        <ResponsivePie
        data={course}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" >-~%"
        innerRadius={0.45}
        padAngle={3}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'dark2' }}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0'
                ]
            ]
        }}
        arcLinkLabelsTextOffset={4}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsOffset={-3}
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsStraightLength={6}
        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
        arcLabelsRadiusOffset={0.55}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        motionConfig={{
            mass: 1,
            tension: 170,
            friction: 26,
            clamp: false,
            precision: 0.01,
            velocity: 0
        }}
       
    />
    </div>
    )
}
export default PieChart