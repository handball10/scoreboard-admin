import './official.scss';

export function Official({ official }) {

    return (
        <tr className="official">
            <td>{official.number}</td>
            <td>{official.firstName} {official.lastName}</td>
            <td>-</td>
            <td>{official.timePenalty || 0}</td>
            <td>0</td>
            <td>0</td>
        </tr>
    )
}