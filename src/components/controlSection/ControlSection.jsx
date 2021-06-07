import './controlSection.scss';

export function ControlSection({ headline, children }) {
    return (
        <div className="control-section column">
            <div className="card">
                <div className="card-header">
                <p className="card-header-title is-size-6 has-text-centered">{headline}</p>
                </div>
                <div className="card-content">
                    {children}
                </div>
            </div>
        </div>
    )
}