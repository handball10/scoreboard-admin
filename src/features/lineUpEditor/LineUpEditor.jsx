import classNames from "classnames";
import { useState } from "react";
import Modal from 'react-modal';
import { TEAM_AWAY, TEAM_HOME } from "../../constants/constants";
import './lineUpEditor.scss';
import { TeamEditor } from "./teamEditor";

export function LineUpEditor() {
    const [ isModalVisible, setModalVisibility ] = useState(true);

    const modalClasses = classNames({
        'modal': true,
        'is-active': isModalVisible
    });

    const customStyles = {
        overlay: {
            background: 'rgba(10,10,10,.86)',
            zIndex: 100
        }
    }

    return (
        <>
            <button className="button" onClick={() => setModalVisibility(true)}>Open</button>
            <Modal
                isOpen={isModalVisible}
                onRequestClose={() => setModalVisibility(false)}
                contentLabel="Modal"
                className={modalClasses}
                style={customStyles}
            >
                <div className="modal-card is-medium">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Team LineUp</p>
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
                        <a className="button is-primary">Save changes</a>
                        <a className="button" onClick={() => setModalVisibility(false)}>Cancel</a>
                    </footer>
                </div>
            </Modal>
        </>
    )
}