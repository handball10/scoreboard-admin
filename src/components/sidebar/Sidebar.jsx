import './sidebar.scss';
import classnames from 'classnames';

export function Sidebar({ position, children }) {

    const classes = classnames({
        'sidebar': true,
        'p-2': true,
        [position]: true
    })

    return (
        <div className={classes}>
            {children}
        </div>
    )
}