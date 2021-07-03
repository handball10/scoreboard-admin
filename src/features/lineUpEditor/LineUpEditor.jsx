import classNames from "classnames";
import { useState } from "react";
import Modal from 'react-modal';
import { TEAM_AWAY, TEAM_HOME } from "../../constants/constants";
import './lineUpEditor.scss';
import { TeamEditor } from "./teamEditor";

export function LineUpEditor() {
    const [ isModalVisible, setModalVisibility ] = useState(false);

    const modalClasses = classNames({
        'modal': true,
        'is-active': isModalVisible
    });

    const customStyles = {
        overlay: {
            background: 'rgba(10,10,10,.86)',
            zIndex: 100
        }
    };

    return (
        <>
            <div className="card team-settings">
                <div className="card-header">
                    <p className="card-header-title is-size-6 has-text-centered">Team lineup</p>
                </div>
                <div className="card-content">
                    
                </div>
                <footer className="card-footer">
                    <a className="card-footer-item" onClick={() => setModalVisibility(true)}>Manual Input</a>
                </footer>
            </div>
            <Modal
                isOpen={isModalVisible}
                onRequestClose={() => setModalVisibility(false)}
                contentLabel="Modal"
                className={modalClasses}
                style={customStyles}
            >
                <div className="modal-card is-medium">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Team lineup</p>
                        <button className="delete" onClick={() => setModalVisibility(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="columns">
                            <div className="column">
                                <TeamEditor team={TEAM_HOME} />
                            </div>
                            <div className="column">
                                <TeamEditor team={TEAM_AWAY} />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a className="button is-primary" onClick={() => setModalVisibility(false)}>Close</a>
                    </footer>
                </div>
            </Modal>
        </>
    )
}